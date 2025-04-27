ALTER TABLE "public"."fight_types" RENAME COLUMN "type" TO "name";

DROP FUNCTION IF EXISTS get_profiles(integer);

CREATE OR REPLACE FUNCTION get_profiles(page_size integer)
    RETURNS TABLE(
        id uuid,
        name text,
        age integer,
        height_cm smallint,
        weight_kg smallint,
        neighborhood text,
        years_of_experience integer,
        fighting_style text,
        fight_type text,
        photos jsonb)
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    v_profile_id uuid;
    current_profile profiles%rowtype;
    challenge_status int := 2;
    match_status int := 4;
    unmatch_status int := 5;
    review_status int := 6;
BEGIN
    SELECT
        profiles.id INTO v_profile_id
    FROM
        profiles
    WHERE
        profiles.user_id = auth.uid();
    IF v_profile_id IS NULL THEN
        RAISE EXCEPTION 'profile not found for user %', auth.uid();
    END IF;
    SELECT
        * INTO current_profile
    FROM
        profiles
    WHERE
        profiles.id = v_profile_id;
    RETURN query WITH filtered_profiles AS (
        SELECT
            p.*
        FROM
            profiles p
        WHERE
            p.id <> v_profile_id
            AND extract(year FROM age(p.date_of_birth)) BETWEEN extract(year FROM age(current_profile.date_of_birth)) - 2 AND extract(year FROM age(current_profile.date_of_birth)) + 2
            AND extract(year FROM age(current_profile.date_of_birth)) BETWEEN extract(year FROM age(p.date_of_birth)) - 2 AND extract(year FROM age(p.date_of_birth)) + 2
            AND st_dwithin(p.location, current_profile.location, current_profile.max_distance_km * 1000)
            AND p.fighting_style_id = current_profile.fighting_style_id
)
    SELECT
        p.id,
        p.name,
        extract(year FROM age(p.date_of_birth))::int AS age,
        p.height_cm,
        p.weight_kg,
        p.neighborhood,
        p.years_of_experience,
        fighting_styles.name AS fighting_style,
        fight_types.name AS fight_type,
(
            SELECT
                coalesce(jsonb_agg(json_build_object('id', profile_photos.id, 'photo_url', profile_photos.photo_url, 'photo_order', profile_photos.photo_order)
                    ORDER BY profile_photos.photo_order)::jsonb, '[]'::jsonb)
            FROM
                profile_photos
            WHERE
                profile_photos.profile_id = p.id
                AND profile_photos.active = TRUE) AS photos
        FROM
            filtered_profiles p
        LEFT JOIN fighting_styles ON fighting_styles.id = p.fighting_style_id
        LEFT JOIN fight_types ON fight_types.id = p.fight_type_id
        LEFT JOIN interactions i_cp ON i_cp.target_id = p.id
            AND i_cp.actor_id = v_profile_id
    LEFT JOIN interactions i_p ON i_p.target_id = v_profile_id
        AND i_p.actor_id = p.id
WHERE (i_cp.status_id IS NULL
        OR i_cp.status_id IN (review_status, unmatch_status))
        AND (i_p.status_id IS NULL
            OR i_p.status_id NOT IN (challenge_status, match_status))
    LIMIT get_profiles.page_size;
END;
$$;

