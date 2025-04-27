import { List } from "@/components/list";
import { PhotoGrid } from "@/components/photoGrid";
import { useEdit } from "@/store/edit";
import { ScrollView, Text, View } from "react-native";
import { details } from "@/utils/details";
import { StackHeaderV3 } from "@/components/StackHeaderV3";
import { useMyProfile, useUpdateProfile } from "@/api/my-profile";
import { router } from "expo-router";
import { isEqual } from "lodash";
import { Alert } from "react-native";
import colors from "tailwindcss/colors";

export default function Layout() {
    const { data: profile } = useMyProfile();
    const { edits, setEdits, gridActive } = useEdit();
    const { mutate } = useUpdateProfile();

    const handlePressCancel = async () => {
        if (isEqual(profile, edits)) {
            router.dismiss();
            return;
        }

        Alert.alert("Discard Changes", "Are you sure you want to discard your changes?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Discard",
                onPress: () => {
                    setEdits(profile);
                    router.dismiss();
                },
            },
        ]);
    };

    const handlePressDone = async () => {
        if (!edits) {
            Alert.alert("Error", "Something went wrong, please try again later");
            return;
        }

        if (isEqual(profile, edits)) {
            router.dismiss();
            return;
        }

        mutate(edits, {
            onSuccess: () => {
                router.dismiss();
            },
            onError: () => {
                Alert.alert("Error", "Something went wrong, please try again later");
            },
        });
    };

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
                <PhotoGrid profile={edits!} />
                <View className="h-10" />
            </View>
            <View className="px-5 pb-10">
                <List title="Details" data={details} profile={edits!} />
            </View>
        </ScrollView>
    );
}
