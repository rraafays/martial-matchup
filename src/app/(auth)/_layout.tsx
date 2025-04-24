import { useAuth } from "@/store/auth";
import { Redirect, Stack } from "expo-router";

export default function Page() {
    const { session } = useAuth();

    if (session) {
        return <Redirect href={"/(app)/(tabs)"} />;
    }

    return (
        <Stack>
            <Stack.Screen name="signIn" />
            <Stack.Screen name="phone" />
            <Stack.Screen name="otp" />
        </Stack>
    );
}
