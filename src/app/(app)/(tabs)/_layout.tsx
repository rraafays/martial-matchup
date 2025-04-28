import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMyProfile } from "@/api/my-profile";
import { View, ActivityIndicator } from "react-native"; // import ActivityIndicator
import { Image } from "expo-image";
import { cn } from "@/utils/cn";
import { useConnection } from "@sendbird/uikit-react-native";
import { useEffect } from "react";

export default function Layout() {
    const { data: profile, isLoading } = useMyProfile(); // watch loading state
    const { connect } = useConnection();

    useEffect(() => {
        if (profile) {
            connect(profile.id, { nickname: profile.name || undefined });
        }
    }, [profile, connect]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="black" />; // wait until profile loaded
    }

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { backgroundColor: colors.white },
                tabBarActiveTintColor: colors.black,
                tabBarInactiveTintColor: colors.neutral[400],
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="challengers"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="skull" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="matches"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="trophy" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="martialMatchup"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) =>
                        profile && profile.avatar_url ? (
                            <View style={{ width: size, height: size }}>
                                <Image
                                    source={profile.avatar_url}
                                    className="flex-1 aspect-square rounded-full bg-black"
                                />
                            </View>
                        ) : (
                            <Ionicons name="ribbon" size={size} color={color} />
                        ),
                }}
            />
        </Tabs>
    );
}
