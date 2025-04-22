import { Stack } from "expo-router";

export default function Page() {
    return (
        <Stack>
            <Stack.Screen name="signIn" />
            <Stack.Screen name="phone" />
            <Stack.Screen name="otp" />
        </Stack>
    );
}
