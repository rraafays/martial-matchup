SELECT
    *
FROM
    get_profile();

CREATE OR REPLACE FUNCTION get_profile()
    RETURNS TABLE(
        id uuid,
        name text,
        date_of_birth date,
        height_cm smallint,
        weight_kg smallint,
        area text,
        latitude float8,
        longitude float8,
        max_distance_km int,
        phone text,
        fighting_style jsonb,
        fight_type jsonb,
        photos jsonb,
        avatar_url text)
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    profile_id uuid;
BEGIN
    SELECT
        profiles.id INTO profile_id
    FROM
        profiles
    WHERE
        user_id = auth.uid();
    IF profile_id IS NULL THEN
        RAISE EXCEPTION 'profile not found: %', auth.uid();
    END IF;
    RETURN query
    SELECT
        profiles.id,
        profiles.name,
        profiles.date_of_birth,
        profiles.height_cm,
        profiles.weight_kg,
        profiles.area,
        profiles.latitude,
        profiles.longitude,
        profiles.max_distance_km,
        profiles.phone,
        row_to_json(fighting_styles.*)::jsonb AS fighting_style,
        row_to_json(fight_types.*)::jsonb AS fight_type,
(
            SELECT
                coalesce(jsonb_agg(json_build_object('id', profile_photos.id, 'photo_url', profile_photos.photo_url, 'photo_order', profile_photos.photo_order)
                    ORDER BY profile_photos.photo_order), '[]'::jsonb)
            FROM
                profile_photos
            WHERE
                profile_photos.profile_id = profiles.id
                AND profile_photos.active = TRUE) AS photos,
(
                SELECT
                    photo_url
                FROM
                    profile_photos
                WHERE
                    profile_photos.profile_id = profiles.id
                    AND profile_photos.active = TRUE
                ORDER BY
                    profile_photos.photo_order
                LIMIT 1) AS avatar_url
    FROM
        profiles
    LEFT JOIN fighting_styles ON fighting_styles.id = profiles.fighting_style_id
    LEFT JOIN fight_types ON fight_types.id = profiles.fight_type_id
WHERE
    profiles.id = profile_id;
END;
$$;

