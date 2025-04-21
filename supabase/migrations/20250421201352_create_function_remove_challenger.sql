CREATE OR REPLACE FUNCTION remove_challenger(interaction uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    v_profile_id uuid;
    interaction_id uuid;
    status int;
    target uuid;
    challenge_status int := 2;
    remove_status int := 3;
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
        id,
        status_id,
        target_id INTO interaction_id,
        status,
        target
    FROM
        interactions
    WHERE
        id = interaction;
    IF NOT found THEN
        RAISE EXCEPTION 'interaction % not found', interaction;
    END IF;
    IF status != challenge_status THEN
        RAISE EXCEPTION 'interaction % is not a challenge', interaction;
    END IF;
    IF target != v_profile_id THEN
        RAISE EXCEPTION 'unauthorized access to interaction % by user %', interaction, auth.uid();
    END IF;
    UPDATE
        interactions
    SET
        status_id = remove_status,
        updated_at = now()
    WHERE
        id = interaction;
END;
$$;

