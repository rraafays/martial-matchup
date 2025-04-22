import { VideoBackground } from "@/components/VideoBackground";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function Page() {
    return (
        <View className="flex-1">
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <VideoBackground source={require("~/assets/images/background.mp4")} />
        </View>
    );
}
