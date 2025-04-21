CREATE OR REPLACE FUNCTION get_challengers()
    RETURNS TABLE(
        id uuid,
        photo_url text,
        profile jsonb)
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    v_profile_id uuid;
    challenge_status int := 2;
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
    RETURN query
    SELECT
        i.id,
        profile_photos.photo_url,
(
            SELECT
                jsonb_build_object('id', p.id, 'name', p.name, 'age', extract(year FROM age(p.date_of_birth))::int, 'height_cm', p.height_cm, 'weight_kg', p.weight_kg, 'neighborhood', p.neighborhood, 'fighting_style', fighting_styles.name, 'fight_type', fight_types.type, 'photos',(
                        SELECT
                            coalesce(jsonb_agg(json_build_object('id', profile_photos.id, 'photo_url', profile_photos.photo_url, 'photo_order', profile_photos.photo_order)
                                ORDER BY profile_photos.photo_order)::jsonb, '{}')
                        FROM profile_photos
                        WHERE
                            profile_photos.profile_id = p.id
                            AND profile_photos.active = TRUE))) AS profile
        FROM
            interactions i
            JOIN profiles p ON p.id = i.actor_id
            LEFT JOIN profile_photos ON profile_photos.id = i.photo_id
            LEFT JOIN fighting_styles ON fighting_styles.id = p.fighting_style_id
            LEFT JOIN fight_types ON fight_types.id = p.fight_type_id
        WHERE
            i.status_id = challenge_status
            AND i.target_id = v_profile_id
        ORDER BY
            i.created_at DESC;
END;
$$;

