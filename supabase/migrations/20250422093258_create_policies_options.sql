CREATE POLICY "select_fight_types_public" ON "public"."fight_types" AS permissive
    FOR SELECT TO public
        USING (TRUE);

CREATE POLICY "select_fighting_styles_public" ON "public"."fighting_styles" AS permissive
    FOR SELECT TO public
        USING (TRUE);

