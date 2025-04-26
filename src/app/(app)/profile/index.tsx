import { PhotoGrid } from "@/components/photoGrid";
import { useEdit } from "@/store/edit";
import { ScrollView, Text, View } from "react-native";

export default function Profile() {
    const { edits, gridActive } = useEdit();

    if (!edits) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Text>something</Text>
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
            </View>
        </ScrollView>
    );
}
