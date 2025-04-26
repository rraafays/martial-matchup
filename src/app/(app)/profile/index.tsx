import { List } from "@/components/list";
import { PhotoGrid } from "@/components/photoGrid";
import { useEdit } from "@/store/edit";
import { ScrollView, Text, View } from "react-native";
import { details } from "@/utils/details";

export default function Profile() {
    const { edits, gridActive } = useEdit();

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
            <View className="px-5">
                <Text className="text-base font-poppins-semibold mb-2">Showcase</Text>
                <PhotoGrid profile={edits} />
                <View className="h-10" />
            </View>
            <View className="px-5">
                <List title="Details" data={details} profile={edits} />
            </View>
        </ScrollView>
    );
}
