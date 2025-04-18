select * from get_profile()

create or replace function get_profile()
returns table (
  id uuid,
  name text,
  date_of_birth date,
  height_cm smallint,
  weight_kg smallint,
  area text,
  latitude float8,
  longitude float8,
  max_distance_km int,
  phone text,
  fighting_style jsonb,
  fight_type jsonb,
  photos jsonb,
  avatar_url text
)
language plpgsql
security definer
as $$
declare profile_id uuid;
begin

select profiles.id into profile_id
from profiles where user_id = auth.uid();

if profile_id is null then
  raise exception 'profile not found: %', auth.uid();
end if;

return query
select 
profiles.id,
profiles.name,
profiles.date_of_birth,
profiles.height_cm,
profiles.weight_kg,
profiles.area,
profiles.latitude,
profiles.longitude,
profiles.max_distance_km,
profiles.phone,
row_to_json(fighting_styles.*)::jsonb as fighting_styles,
row_to_json(fight_types.*)::jsonb as fight_types,
    (
      select coalesce(jsonb_agg(json_build_object(
        'id', profile_photos.id,
        'photo_url', profile_photos.photo_url,
        'photo_order', profile_photos.photo_order
      ) order by profile_photos.photo_order), '[]'::jsonb)
      from profile_photos
      where profile_photos.profile_id = profiles.id and profile_photos.active = true
    ) as photos,
    (
      select photo_url
      from profile_photos
      where profile_photos.profile_id = profiles.id and profile_photos.active = true
      order by profile_photos.photo_order
      limit 1
    ) as avatar_url
from profiles
left join fighting_styles on fighting_styles.id = profiles.fighting_style_id 
left join fight_types on fight_types.id = profiles.fight_type_id 
where profiles.id = profile_id;
end;
$$;
