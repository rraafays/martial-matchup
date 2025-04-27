import { PrivateProfile } from "@/api/my-profile/types";
import { StackHeaderV4 } from "@/components/StackHeaderV4";
import { useEdit } from "@/store/edit";
import { router } from "expo-router";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Page() {
    const { edits, setEdits } = useEdit();
    const [yearsOfExperience, setYearsOfExperience] = useState(edits?.years_of_experience || 0);

    const handlePress = () => {
        setEdits({
            ...edits,
            years_of_experience: yearsOfExperience,
        } as PrivateProfile);
        router.back();
    };

    const increment = () => {
        if (yearsOfExperience < 99) {
            setYearsOfExperience(yearsOfExperience + 1);
        }
    };

    const decrement = () => {
        if (yearsOfExperience > 0) {
            setYearsOfExperience(yearsOfExperience - 1);
        }
    };

    return (
        <View className="flex-1 bg-white p-5 items-center justify-center">
            <StackHeaderV4 title="Experience" onPressBack={handlePress} />
            <View className="flex-row justify-center items-center">
                <TouchableOpacity
                    onPress={decrement}
                    className="w-24 h-24 bg-gray-200 rounded-full justify-center items-center"
                >
                    <Text className="text-4xl font-bold">-</Text>
                </TouchableOpacity>
                <View className="w-48 items-center justify-center px-2 py-2">
                    <Text
                        className="text-6xl font-poppins-bold leading-tight"
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {yearsOfExperience}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={increment}
                    className="w-24 h-24 bg-gray-200 rounded-full justify-center items-center"
                >
                    <Text className="text-4xl font-bold">+</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text className="text-lg font-poppins-medium text-center mt-4">
                    Years of Experience
                </Text>
            </View>
        </View>
    );
}
