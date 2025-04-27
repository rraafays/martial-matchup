import { PrivateProfile } from "@/api/my-profile/types";
import { StackHeaderV4 } from "@/components/StackHeaderV4";
import { useEdit } from "@/store/edit";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import colors from "tailwindcss/colors";

export default function Page() {
    const { edits, setEdits } = useEdit();
    const [name, setName] = useState(edits?.name || "");

    const handlePressBack = () => {
        if (name) {
            setEdits({
                ...edits,
                name: name,
            } as PrivateProfile);
        }
        router.back();
    };

    return (
        <View className="flex-1 bg-white p-5">
            <StackHeaderV4 title="Name" onPressBack={handlePressBack} />
            <TextInput
                className="border-b h-20 text-4xl font-poppins-medium"
                selectionColor={colors.black}
                cursorColor={colors.black}
                value={name}
                onChangeText={setName}
            />
        </View>
    );
}
