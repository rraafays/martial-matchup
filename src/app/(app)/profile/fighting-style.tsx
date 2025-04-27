import { PrivateProfile } from "@/api/my-profile/types";
import { useFightingStyle } from "@/api/options";
import { RadioList } from "@/components/RadioList";
import { StackHeaderV4 } from "@/components/StackHeaderV4";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Page() {
    const { edits, setEdits } = useEdit();
    const { data } = useFightingStyle();
    const [selected, setSelected] = useState(edits?.fighting_style || null);

    const handlePress = () => {
        if (selected) {
            setEdits({
                ...edits,
                fighting_style: selected,
            } as PrivateProfile);
        }
        router.back();
    };

    return (
        <View className="flex-1 bg-white p-5">
            <StackHeaderV4 title="Fighting Style" onPressBack={handlePress} />
            <RadioList
                options={data?.map((item) => ({ id: item.id, name: item.name || "" }))}
                onChange={setSelected}
                initialSelection={selected}
            />
        </View>
    );
}
