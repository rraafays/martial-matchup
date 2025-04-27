import { PrivateProfile } from "@/api/my-profile/types";
import { StackHeaderV4 } from "@/components/StackHeaderV4";
import { useEdit } from "@/store/edit";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { range } from "lodash";
import { useState } from "react";
import { View } from "react-native";

export default function Page() {
    const { edits, setEdits } = useEdit();
    const [selectedWeight, setSelectedWeight] = useState(edits?.weight_kg || undefined);

    const handlePress = () => {
        if (selectedWeight) {
            setEdits({
                ...edits,
                weight_kg: selectedWeight,
            } as PrivateProfile);
        }
        router.back();
    };

    return (
        <View className="flex-1 bg-white p-5">
            <StackHeaderV4 title="Weight" onPressBack={handlePress} />
            <Picker
                selectedValue={selectedWeight}
                onValueChange={(itemValue, _itemIndex) => setSelectedWeight(itemValue)}
            >
                {range(45, 145).map((weight: number) => (
                    <Picker.Item key={weight} label={`${weight} kg`} value={weight} />
                ))}
            </Picker>
        </View>
    );
}
