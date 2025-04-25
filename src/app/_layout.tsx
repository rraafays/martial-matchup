import { SplashScreen, Stack } from "expo-router";
import "../../global.css";
import { cssInterop } from "nativewind";
import { VideoView } from "expo-video";
import { fonts } from "@/constants/fonts";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from "@/store/auth";
import { Image } from "expo-image";

cssInterop(VideoView, { className: { target: "style" } });
cssInterop(Ionicons, { className: { target: "style" } });
cssInterop(Image, { className: { target: "style" } });

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function Layout() {
    const [loaded, error] = useFonts(fonts);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(app)" options={{ animation: "none" }} />
                    <Stack.Screen name="(auth)" options={{ animation: "none" }} />
                </Stack>
            </AuthProvider>
        </QueryClientProvider>
    );
}
