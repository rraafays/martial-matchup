import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Challenge, PublicProfile } from "./types";

export const useProfiles = (page_size: number) => {
    return useQuery<PublicProfile[]>({
        queryKey: ["profiles", page_size],
        queryFn: async () => {
            const { data, error } = await supabase
                .rpc("get_profiles", {
                    page_size,
                })
                .returns<PublicProfile[]>();

            if (error) {
                throw error;
            }

            return data;
        },
        initialData: [],
    });
};

export const useSkipProfile = () => {
    return useMutation({
        mutationFn: async (profile: string) => {
            const { error } = await supabase.rpc("skip_profile", {
                profile,
            });

            if (error) {
                throw error;
            }
        },
    });
};

export const useChallengeProfile = () => {
    return useMutation({
        mutationFn: async ({ profile, photo }: { profile: string; photo: string | undefined }) => {
            const { error } = await supabase.rpc("challenge_profile", {
                profile,
                photo,
            });

            if (error) {
                throw error;
            }
        },
    });
};

export const useReviewProfiles = () => {
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.rpc("review_profiles");

            if (error) {
                throw error;
            }
        },
    });
};

export const useChallengers = () => {
    return useQuery<Challenge[]>({
        queryKey: ["challengers"],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_challengers").returns<Challenge[]>();

            if (error) {
                throw error;
            }

            return data;
        },
        initialData: [],
    });
};

export const useRemoveChallenger = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (interaction: string) => {
            const { error } = await supabase.rpc("remove_challenger", {
                interaction,
            });

            if (error) {
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["challengers"] });
        },
    });
};

export const useMatch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (interaction: string) => {
            const { error } = await supabase.rpc("match", {
                interaction,
            });

            if (error) {
                throw error;
            }
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["challengers"] });
        },
    });
};

export const useUnmatch = () => {
    return useMutation({
        mutationFn: async (interaction: string) => {
            const { error } = await supabase.rpc("unmatch", {
                interaction,
            });

            if (error) {
                throw error;
            }
        },
    });
};
