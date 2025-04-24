import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useSignInWithOneTimePassword = () => {
    return useMutation({
        mutationFn: async (phoneNumber: string) => {
            let { error } = await supabase.auth.signInWithOtp({
                phone: phoneNumber,
            });
            if (error) {
                let message = "Something went wrong, please try again later.";
                switch (error.code) {
                    case "sms_send_failed":
                        message = "Please ensure your phone number is correct.";
                        break;
                    case "over_sms_send_rate_limit":
                        message = "Too many attempts. Please try again later.";
                        break;
                }
                throw new Error(message);
            }
        },
    });
};

export const useVerifyOneTimePassword = () => {
    return useMutation({
        mutationFn: async ({ phoneNumber, token }: { phoneNumber: string; token: string }) => {
            let { error } = await supabase.auth.verifyOtp({
                phone: phoneNumber,
                token: token,
                type: "sms",
            });
            if (error) {
                let message = "Something went wrong, please try again later.";
                switch (error.code) {
                    case "otp_expired":
                        message = "Your code is either invalid or expired.";
                        break;
                }
                throw new Error(message);
            }
        },
    });
};

export const useSignOut = () => {
    return useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
        },
    });
};
