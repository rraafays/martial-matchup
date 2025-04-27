import { useIsMutating } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
    const isPending = useIsMutating({ mutationKey: ["updateProfile"] });

    return (
        <Stack>
            {!!isPending && (
                <View className="bg-white/60 flex-1 items-center justify-center absolute left-0 top-0 right-0 bottom-0 z-10">
                    <ActivityIndicator size={"large"} color={"black"} />
                </View>
            )}
        </Stack>
    );
}
