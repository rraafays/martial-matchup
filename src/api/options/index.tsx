import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const useFightingStyle = () => {
    return useQuery({
        queryKey: ["fighting_style"],
        queryFn: async () => {
            const { data, error } = await supabase.from("fighting_styles").select("*");

            if (error) {
                throw error;
            }

            return data;
        },
        initialData: [],
    });
};

export const useFightType = () => {
    return useQuery({
        queryKey: ["fight_type"],
        queryFn: async () => {
            const { data, error } = await supabase.from("fight_types").select("*");

            if (error) {
                throw error;
            }

            return data;
        },
        initialData: [],
    });
};
