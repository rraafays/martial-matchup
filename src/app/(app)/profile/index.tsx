import { List } from "@/components/list";
import { PhotoGrid } from "@/components/photoGrid";
import { useEdit } from "@/store/edit";
import { ScrollView, Text, View } from "react-native";
import { details } from "@/utils/details";
import { StackHeaderV3 } from "@/components/StackHeaderV3";
import { useMyProfile } from "@/api/my-profile";
import { router } from "expo-router";

export default function Profile() {
    const { edits, gridActive } = useEdit();
    const { data: profile } = useMyProfile();

    const handlePressCancel = () => {
        router.dismiss();
    };

    const handlePressDone = () => {
        router.dismiss();
    };

    if (!edits) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>Something went wrong.</Text>
            </View>
        );
    }

    return (
        <ScrollView
            className="flex-1 bg-white pt-10"
            showsVerticalScrollIndicator={false}
            scrollEnabled={!gridActive}
        >
            <StackHeaderV3
                title={edits?.name || "Edit"}
                onPressCancel={handlePressCancel}
                onPressDone={handlePressDone}
            />
            <View className="px-5">
                <Text className="text-base font-poppins-semibold mb-2">Showcase</Text>
                <PhotoGrid profile={edits} />
                <View className="h-10" />
            </View>
            <View className="px-5 pb-10">
                <List title="Details" data={details} profile={edits} />
            </View>
        </ScrollView>
    );
}
