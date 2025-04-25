import { useMyProfile } from "@/api/my-profile";
import { Card } from "@/components/Card";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, router, Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "~/assets/images/full-minimal-logo.svg";

export default function Page() {
    const { data: profile } = useMyProfile();
    return (
        <SafeAreaView className="flex-1 bg-white">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="px-5 border-b border-neutral-300">
                <View className="flex-row items-center justify-between">
                    <Logo width={64} />
                    <View className="flex-row items-center gap-4">
                        <Link href={"/"} suppressHighlighting>
                            <Ionicons name="options-outline" className="text-2xl" />
                        </Link>
                        <Link href={"/settings"} suppressHighlighting>
                            <Ionicons name="settings-outline" className="text-2xl" />
                        </Link>
                    </View>
                </View>
                <View className="items-center gap-2 my-12">
                    <Pressable
                        className="h-32 aspect-square rounded-full border-4 border-black p-1"
                        onPress={() => router.push("/")}
                    >
                        <Image
                            source={profile?.avatar_url}
                            className="flex-1 rounded-full bg-neutral-400"
                        />
                    </Pressable>
                    <Text className="text-2xl font-poppins-semibold">{profile?.name}</Text>
                </View>
            </View>
            <View className="flex-1 p-5 gap-4">
                <Card
                    key={"help"}
                    icon={<Ionicons name="help" className="text-2xl" />}
                    title="Help Center"
                    subtitle="Safety, Security, and more"
                />
            </View>
        </SafeAreaView>
    );
}
