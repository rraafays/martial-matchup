CREATE OR REPLACE FUNCTION review_profiles()
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    actor uuid;
    loc geography;
    max_distance int;
    skip_status int := 1;
    review_status int := 6;
BEGIN
    SELECT
        profiles.id INTO actor
    FROM
        profiles
    WHERE
        profiles.user_id = auth.uid();
    IF actor IS NULL THEN
        RAISE EXCEPTION 'profile not found: %', auth.uid();
    END IF;
    SELECT
        location,
        max_distance_km INTO loc,
        max_distance
    FROM
        profiles
    WHERE
        id = actor;
    UPDATE
        interactions
    SET
        status_id = review_status,
        updated_at = now()
    WHERE
        actor_id = actor
        AND status_id = skip_status
        AND st_dwithin((
            SELECT
                location
            FROM profiles
            WHERE
                profiles.id = interactions.target_id), loc, max_distance * 1000);
END;
$$;

