import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerTitle: "Challengers", headerShadowVisible: false }}
            />
            <Stack.Screen name="[id]" />
        </Stack>
    );
}
