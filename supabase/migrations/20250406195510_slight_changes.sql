revoke delete on table "public"."profile_opponent_styles" from "anon";

revoke insert on table "public"."profile_opponent_styles" from "anon";

revoke references on table "public"."profile_opponent_styles" from "anon";

revoke select on table "public"."profile_opponent_styles" from "anon";

revoke trigger on table "public"."profile_opponent_styles" from "anon";

revoke truncate on table "public"."profile_opponent_styles" from "anon";

revoke update on table "public"."profile_opponent_styles" from "anon";

revoke delete on table "public"."profile_opponent_styles" from "authenticated";

revoke insert on table "public"."profile_opponent_styles" from "authenticated";

revoke references on table "public"."profile_opponent_styles" from "authenticated";

revoke select on table "public"."profile_opponent_styles" from "authenticated";

revoke trigger on table "public"."profile_opponent_styles" from "authenticated";

revoke truncate on table "public"."profile_opponent_styles" from "authenticated";

revoke update on table "public"."profile_opponent_styles" from "authenticated";

revoke delete on table "public"."profile_opponent_styles" from "service_role";

revoke insert on table "public"."profile_opponent_styles" from "service_role";

revoke references on table "public"."profile_opponent_styles" from "service_role";

revoke select on table "public"."profile_opponent_styles" from "service_role";

revoke trigger on table "public"."profile_opponent_styles" from "service_role";

revoke truncate on table "public"."profile_opponent_styles" from "service_role";

revoke update on table "public"."profile_opponent_styles" from "service_role";

alter table "public"."profile_opponent_styles" drop constraint "profile_opponent_styles_fighting_style_id_fkey";

alter table "public"."profile_opponent_styles" drop constraint "profile_opponent_styles_profile_id_fkey";

alter table "public"."profile_opponent_styles" drop constraint "profile_opponent_styles_pkey";

drop index if exists "public"."profile_opponent_styles_pkey";

drop table "public"."profile_opponent_styles";

create table "public"."profile_fight_types" (
    "profile_id" uuid not null,
    "fight_type_id" integer not null
);


alter table "public"."profile_fight_types" enable row level security;

alter table "public"."profiles" add column "fighting_style_id" integer;

CREATE UNIQUE INDEX profile_fight_types_pkey ON public.profile_fight_types USING btree (profile_id, fight_type_id);

alter table "public"."profile_fight_types" add constraint "profile_fight_types_pkey" PRIMARY KEY using index "profile_fight_types_pkey";

alter table "public"."profile_fight_types" add constraint "profile_fight_types_fight_type_id_fkey" FOREIGN KEY (fight_type_id) REFERENCES fight_types(id) not valid;

alter table "public"."profile_fight_types" validate constraint "profile_fight_types_fight_type_id_fkey";

alter table "public"."profile_fight_types" add constraint "profile_opponent_styles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."profile_fight_types" validate constraint "profile_opponent_styles_profile_id_fkey";

alter table "public"."profiles" add constraint "profiles_fighting_style_id_fkey" FOREIGN KEY (fighting_style_id) REFERENCES fighting_styles(id) not valid;

alter table "public"."profiles" validate constraint "profiles_fighting_style_id_fkey";

grant delete on table "public"."profile_fight_types" to "anon";

grant insert on table "public"."profile_fight_types" to "anon";

grant references on table "public"."profile_fight_types" to "anon";

grant select on table "public"."profile_fight_types" to "anon";

grant trigger on table "public"."profile_fight_types" to "anon";

grant truncate on table "public"."profile_fight_types" to "anon";

grant update on table "public"."profile_fight_types" to "anon";

grant delete on table "public"."profile_fight_types" to "authenticated";

grant insert on table "public"."profile_fight_types" to "authenticated";

grant references on table "public"."profile_fight_types" to "authenticated";

grant select on table "public"."profile_fight_types" to "authenticated";

grant trigger on table "public"."profile_fight_types" to "authenticated";

grant truncate on table "public"."profile_fight_types" to "authenticated";

grant update on table "public"."profile_fight_types" to "authenticated";

grant delete on table "public"."profile_fight_types" to "service_role";

grant insert on table "public"."profile_fight_types" to "service_role";

grant references on table "public"."profile_fight_types" to "service_role";

grant select on table "public"."profile_fight_types" to "service_role";

grant trigger on table "public"."profile_fight_types" to "service_role";

grant truncate on table "public"."profile_fight_types" to "service_role";

grant update on table "public"."profile_fight_types" to "service_role";


