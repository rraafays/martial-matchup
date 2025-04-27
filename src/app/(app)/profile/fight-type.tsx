import { PrivateProfile } from "@/api/my-profile/types";
import { useFightType } from "@/api/options";
import { RadioList } from "@/components/RadioList";
import { StackHeaderV4 } from "@/components/StackHeaderV4";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Page() {
    const { edits, setEdits } = useEdit();
    const { data } = useFightType();
    const [selected, setSelected] = useState(edits?.fight_type || null);

    const handlePress = () => {
        if (selected) {
            setEdits({
                ...edits,
                fight_type: selected,
            } as PrivateProfile);
        }
        router.back();
    };

    return (
        <View className="flex-1 bg-white p-5">
            <StackHeaderV4 title="Fight Type Style" onPressBack={handlePress} />
            <RadioList
                options={data?.map((item) => ({ id: item.id, name: item.name || "" }))}
                onChange={setSelected}
                initialSelection={selected}
            />
        </View>
    );
}
