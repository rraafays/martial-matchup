CREATE OR REPLACE FUNCTION MATCH(interaction uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    v_profile_id uuid;
    actor uuid;
    target uuid;
    interaction_id uuid;
    status int;
    challenge_status int := 2;
    remove_status int := 3;
    match_status int := 4;
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
        actor_id,
        target_id INTO interaction_id,
        status,
        actor,
        target
    FROM
        interactions
    WHERE
        id = interaction;
    IF NOT found THEN
        RAISE EXCEPTION 'interaction % not found', interaction;
    END IF;
    IF status NOT IN (challenge_status, remove_status) THEN
        RAISE EXCEPTION 'interaction % is not a challenge or remove', interaction;
    END IF;
    IF target != v_profile_id THEN
        RAISE EXCEPTION 'unauthorized access to interaction % by user %', interaction, auth.uid();
    END IF;
    PERFORM
        chat.create_channel(interaction_id, actor, target);
    UPDATE
        interactions
    SET
        status_id = match_status,
        updated_at = now(),
        updated_by = v_profile_id
    WHERE
        id = interaction;
END;
$$;

