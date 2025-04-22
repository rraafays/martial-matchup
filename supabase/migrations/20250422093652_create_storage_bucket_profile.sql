INSERT INTO storage.buckets(id, name, public)
    VALUES ('profiles', 'profiles', TRUE);

CREATE POLICY "insert_profiles_bucket_authenticated" ON storage.objects
    FOR INSERT TO authenticated
        WITH CHECK (bucket_id = 'profiles');

