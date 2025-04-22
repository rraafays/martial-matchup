import { Tabs } from "expo-router";
import colors from "tailwindcss/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
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
                }}
            />
            <Tabs.Screen
                name="matches"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="trophy" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="martialMatchup"
                options={{
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="ribbon" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
