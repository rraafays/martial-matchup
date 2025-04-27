import { useAuth } from "@/store/auth";
import { EditProvider } from "@/store/edit";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return <Text>One moment..</Text>;
    }

    if (!session) {
        return <Redirect href={"/signIn"} />;
    }

    return (
        <EditProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
                <Stack.Screen name="settings" />
                <Stack.Screen name="profile" />
            </Stack>
        </EditProvider>
    );
}
