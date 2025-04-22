import { VideoBackground } from "@/components/VideoBackground";
import { Link, Stack } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";
import Logo from "~/assets/images/hinge-logo.svg";

export default function Page() {
    return (
        <View className="flex-1">
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <VideoBackground source={require("~/assets/images/background.mp4")}>
                <SafeAreaView className="flex-1 p-10">
                    <View className="flex-1 items-center pt-20">
                        <Logo fill={colors.white} width={150} height={60} />
                        <View className="h-4" />
                        <Text className="text-white text-xl font-poppins-semibold">
                            Get ready for the next battle
                        </Text>
                    </View>
                    <Link href={"/phone"} asChild>
                        <Pressable className="bg-black rounded-full p-4 flex-row items-center justify-center">
                            <Text className="text-white text-lg font-poppins-semibold">
                                Register with Phone Number
                            </Text>
                        </Pressable>
                    </Link>
                </SafeAreaView>
            </VideoBackground>
        </View>
    );
}
