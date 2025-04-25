import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyProfile = () => {
    return useQuery<PrivateProfile | null>({
        queryKey: ["myProfile"],
        queryFn: async () => {
            let { data, error } = await supabase.rpc("get_profile").single<PrivateProfile>();
            if (error) throw error;
            else return data;
        },
        initialData: null,
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (profile: PrivateProfile) => {
            const photos = profile.photos.map(({ id, photo_url, photo_order }) => {
                return { id, photo_url, photo_order };
            });
            let { error } = await supabase.rpc("update_profile", {
                date_of_birth: profile.date_of_birth,
                fight_type: profile.fight_type?.id,
                fighting_style: profile.fighting_style?.id,
                height_cm: profile.height_cm,
                latitude: profile.latitude,
                longitude: profile.longitude,
                name: profile.name,
                neighborhood: profile.neighborhood,
                photos: photos,
                weight_kg: profile.weight_kg,
                years_of_experience: profile.years_of_experience,
            });
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        },
    });
};

export const useUpdateDistance = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ distance }: { distance: number }) => {
            const { error } = await supabase.rpc("update_distance", {
                distance: distance,
            });

            if (error) {
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        },
    });
};

export const useUpdateLocation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            latitude,
            longitude,
            neighborhood,
        }: {
            latitude: number;
            longitude: number;
            neighborhood: string;
        }) => {
            const { error } = await supabase.rpc("update_location", {
                latitude: latitude,
                longitude: longitude,
                neighborhood: neighborhood,
            });

            if (error) {
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["myProfile"] });
        },
    });
};
