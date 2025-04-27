import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { FC } from "react";

interface Props {
    title: string;
    onPressBack?: () => void;
}

export const StackHeaderV4: FC<Props> = ({ title, onPressBack }) => {
    return (
        <Stack.Screen
            options={{
                title,
                headerTitleAlign: "center",
                headerLeft: () => (
                    <Ionicons
                        name="chevron-back"
                        className="text-2xl"
                        onPress={onPressBack}
                        suppressHighlighting
                    />
                ),
            }}
        />
    );
};
