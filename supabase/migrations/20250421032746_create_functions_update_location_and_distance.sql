CREATE OR REPLACE FUNCTION update_location(latitude float8, longitude float8, area text)
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
        area = update_location.area,
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

