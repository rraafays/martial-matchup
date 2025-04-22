CREATE OR REPLACE FUNCTION chat.delete_channel(channel uuid)
    RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    sendbird_app_id text;
    sendbird_api_token text;
    sendbird_api_url text;
    sendbird_status int;
    sendbird_content jsonb;
BEGIN
    SELECT
        decrypted_secret INTO sendbird_app_id
    FROM
        vault.decrypted_secrets
    WHERE
        name = 'sendbird_app_id';
    SELECT
        decrypted_secret INTO sendbird_api_token
    FROM
        vault.decrypted_secrets
    WHERE
        name = 'sendbird_api_token';
    sendbird_api_url := 'https://api-' || sendbird_app_id || '.sendbird.com/v3/group_channels/' || channel;
    SELECT
        status,
        content::jsonb INTO sendbird_status,
        sendbird_content
    FROM
        http(('DELETE', sendbird_api_url, ARRAY[http_header('Api-Token', sendbird_api_token)], 'application/json', NULL)::http_request);
    IF sendbird_status != 200 THEN
        RAISE EXCEPTION 'sendbird error: %', sendbird_content;
    END IF;
END;
$$;

