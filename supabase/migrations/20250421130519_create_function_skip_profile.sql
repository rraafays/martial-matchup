CREATE OR REPLACE FUNCTION skip_profile(profile uuid)
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    actor uuid;
    interaction_id uuid;
    skip_status int := 1;
    review_status int := 6;
    like_status int := 2;
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
        interactions.id INTO interaction_id
    FROM
        interactions
    WHERE
        interactions.actor_id = actor
        AND interactions.target_id = profile
        AND interactions.status_id IN (skip_status, review_status, like_status);
    IF found THEN
        UPDATE
            interactions
        SET
            status_id = skip_status,
            updated_at = now(),
            updated_by = actor,
            photo_id = NULL
        WHERE
            interactions.id = interaction_id;
        RETURN interaction_id;
    END IF;
    INSERT INTO interactions(actor_id, target_id, updated_by, status_id)
        VALUES (actor, profile, actor, skip_status)
    RETURNING
        interactions.id INTO interaction_id;
    RETURN interaction_id;
END;
$$;

