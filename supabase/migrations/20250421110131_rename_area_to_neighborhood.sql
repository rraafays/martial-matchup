ALTER TABLE "public"."profiles" RENAME COLUMN "area" TO "neighborhood";

DROP FUNCTION IF EXISTS get_profile();

DROP FUNCTION IF EXISTS update_profile(text, date, integer, integer, text, float8, float8, integer, integer, integer, jsonb);

DROP FUNCTION IF EXISTS update_location(float8, float8, text);

DROP FUNCTION IF EXISTS update_distance(integer);

CREATE OR REPLACE FUNCTION get_profile()
    RETURNS TABLE(
        id uuid,
        name text,
        date_of_birth date,
        height_cm smallint,
        weight_kg smallint,
        neighborhood text,
        latitude float8,
        longitude float8,
        max_distance_km int,
        phone text,
        years_of_experience int,
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
        profiles.neighborhood,
        profiles.latitude,
        profiles.longitude,
        profiles.max_distance_km,
        profiles.phone,
        profiles.years_of_experience,
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

CREATE OR REPLACE FUNCTION update_profile(name text DEFAULT NULL, date_of_birth date DEFAULT NULL, height_cm integer DEFAULT NULL, weight_kg integer DEFAULT NULL, neighborhood text DEFAULT NULL, latitude float8 DEFAULT NULL, longitude float8 DEFAULT NULL, years_of_experience integer DEFAULT NULL, fighting_style integer DEFAULT NULL, fight_type integer DEFAULT NULL, photos jsonb DEFAULT NULL)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    v_profile_id uuid;
    DECLARE photo jsonb;
    DECLARE existing_photo record;
    DECLARE new_photo_id uuid;
    DECLARE active_photo_ids uuid[] := '{}';
BEGIN
    SELECT
        profiles.id INTO v_profile_id
    FROM
        profiles
    WHERE
        user_id = auth.uid();
    IF v_profile_id IS NULL THEN
        RAISE EXCEPTION 'profile not found: %', auth.uid();
    END IF;
    UPDATE
        profiles
    SET
        name = coalesce(update_profile.name, profiles.name),
        date_of_birth = coalesce(update_profile.date_of_birth, profiles.date_of_birth),
        height_cm = coalesce(update_profile.height_cm, profiles.height_cm),
        weight_kg = coalesce(update_profile.weight_kg, profiles.weight_kg),
        neighborhood = coalesce(update_profile.neighborhood, profiles.neighborhood),
        latitude = coalesce(update_profile.latitude, profiles.latitude),
        longitude = coalesce(update_profile.longitude, profiles.longitude),
        years_of_experience = coalesce(update_profile.years_of_experience, profiles.years_of_experience),
        fighting_style_id = coalesce(update_profile.fighting_style, profiles.fighting_style_id),
        fight_type_id = coalesce(update_profile.fight_type, profiles.fight_type_id),
        updated_at = now()
    WHERE
        profiles.id = v_profile_id;
    IF photos IS NOT NULL THEN
        FOR photo IN (
            SELECT
                *
            FROM
                jsonb_array_elements(update_profile.photos))
            LOOP
                IF photo ->> 'id' IS NOT NULL THEN
                    SELECT
                        id,
                        photo_url,
                        active INTO existing_photo
                    FROM
                        profile_photos
                    WHERE
                        id =(photo ->> 'id')::uuid
                        AND profile_photos.profile_id = v_profile_id;
                    IF found THEN
                        IF existing_photo.photo_url IS DISTINCT FROM (photo ->> 'photo_url') THEN
                            UPDATE
                                profile_photos
                            SET
                                active = FALSE
                            WHERE
                                id = existing_photo.id;
                            new_photo_id := gen_random_uuid();
                            INSERT INTO profile_photos(id, profile_id, photo_url, photo_order, active)
                                VALUES (new_photo_id, v_profile_id,(photo ->> 'photo_url'),
(photo ->> 'photo_order')::integer, TRUE);
                            active_photo_ids := array_append(active_photo_ids, new_photo_id);
                        ELSE
                            UPDATE
                                profile_photos
                            SET
                                active = TRUE,
                                photo_order =(photo ->> 'photo_order')::integer
                            WHERE
                                id = existing_photo.id;
                            active_photo_ids := array_append(active_photo_ids, existing_photo.id);
                        END IF;
                    END IF;
                ELSE
                    new_photo_id := gen_random_uuid();
                    INSERT INTO profile_photos(id, profile_id, photo_url, photo_order, active)
                        VALUES (new_photo_id, v_profile_id,(photo ->> 'photo_url'),
(photo ->> 'photo_order')::integer, TRUE);
                    active_photo_ids := array_append(active_photo_ids, new_photo_id);
                END IF;
            END LOOP;
        IF jsonb_array_length(update_profile.photos) = 0 THEN
            UPDATE
                profile_photos
            SET
                active = FALSE
            WHERE
                profile_photos.profile_id = v_profile_id
                AND active = TRUE;
        ELSE
            UPDATE
                profile_photos
            SET
                active = FALSE
            WHERE
                profile_photos.profile_id = v_profile_id
                AND active = TRUE
                AND id <> ALL (active_photo_ids);
        END IF;
    END IF;
END;
$$;

CREATE OR REPLACE FUNCTION update_location(latitude float8, longitude float8, neighborhood text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    profile_id uuid;
BEGIN
    SELECT
        id INTO profile_id
    FROM
        profiles
    WHERE
        user_id = auth.uid();
    IF profile_id IS NULL THEN
        RAISE EXCEPTION 'profile not found: %', auth.uid();
    END IF;
    UPDATE
        profiles
    SET
        latitude = update_location.latitude,
        longitude = update_location.longitude,
        neighborhood = update_location.neighborhood,
        updated_at = now()
    WHERE
        id = profile_id;
END;
$$;

CREATE OR REPLACE FUNCTION update_distance(distance integer)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    profile_id uuid;
BEGIN
    SELECT
        id INTO profile_id
    FROM
        profiles
    WHERE
        user_id = auth.uid();
    IF profile_id IS NULL THEN
        RAISE EXCEPTION 'profile not found: %', auth.uid();
    END IF;
    UPDATE
        profiles
    SET
        max_distance_km = distance,
        updated_at = now()
    WHERE
        id = profile_id;
END;
$$;

