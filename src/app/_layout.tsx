import { Stack } from "expo-router";
import "../../global.css";
import { cssInterop } from "nativewind";
import { VideoView } from "expo-video";

cssInterop(VideoView, { className: { target: "style" } });

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(app)" />
        </Stack>
    );
}
