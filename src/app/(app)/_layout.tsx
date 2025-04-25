import { useAuth } from "@/store/auth";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Text } from "react-native-svg";

export default function Layout() {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return <Text>One moment..</Text>;
    }

    if (!session) {
        return <Redirect href={"/signIn"} />;
    }

    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ animation: "none" }} />
                <Stack.Screen name="settings" options={{ animation: "slide_from_bottom" }} />
            </Stack>
        </>
    );
}
