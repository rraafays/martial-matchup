CREATE OR REPLACE FUNCTION unmatch(interaction uuid)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
DECLARE
    v_profile_id uuid;
    interaction_id uuid;
    status int;
    actor uuid;
    target uuid;
    match_status int := 4;
    unmatch_status int := 5;
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
    IF status != match_status THEN
        RAISE EXCEPTION 'interaction % is not a match', interaction;
    END IF;
    IF v_profile_id NOT IN (actor, target) THEN
        RAISE EXCEPTION 'unauthorized access to interaction % by user %', interaction, auth.uid();
    END IF;
    PERFORM
        chat.delete_channel(interaction_id);
    UPDATE
        interactions
    SET
        status_id = unmatch_status,
        updated_at = now(),
        updated_by = v_profile_id
    WHERE
        id = interaction;
END;
$$;

