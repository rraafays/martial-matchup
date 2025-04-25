import { useMyProfile } from "@/api/my-profile";
import { Redirect } from "expo-router";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";

export default function Page() {
    const { isPending, isError, data } = useMyProfile();

    if (isPending) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size={"small"} />
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <Text>Something went wrong.</Text>
            </View>
        );
    }

    return <Redirect href={"/(app)/(tabs)"} />;
}
