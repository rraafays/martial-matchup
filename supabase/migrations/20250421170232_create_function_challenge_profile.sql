CREATE OR REPLACE FUNCTION challenge_profile(profile uuid, photo uuid DEFAULT NULL)
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    actor uuid;
    interaction_id uuid;
    skip_status int := 1;
    review_status int := 6;
    challenge_status int := 2;
BEGIN
    SELECT
        profiles.id INTO actor
    FROM
        profiles
    WHERE
        profiles.user_id = auth.uid();
    IF actor IS NULL THEN
        RAISE EXCEPTION 'profile not found for user %', auth.uid();
    END IF;
    SELECT
        interactions.id INTO interaction_id
    FROM
        interactions
    WHERE
        interactions.actor_id = actor
        AND interactions.target_id = profile
        AND interactions.status_id IN (skip_status, review_status, challenge_status);
    IF found THEN
        UPDATE
            interactions
        SET
            status_id = challenge_status,
            updated_at = now(),
            photo_id = photo
        WHERE
            interactions.id = interaction_id;
        RETURN interaction_id;
    END IF;
    INSERT INTO interactions(actor_id, target_id, updated_by, status_id, photo_id)
        VALUES (actor, profile, actor, challenge_status, photo)
    RETURNING
        interactions.id INTO interaction_id;
    RETURN interaction_id;
END;
$$;

