import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { FC } from "react";

interface Props {
    title: string;
}

export const StackHeaderV2: FC<Props> = ({ title }) => {
    return (
        <Stack.Screen
            options={{
                title,
                headerTitleAlign: "center",
                headerBackVisible: false,
                headerRight: () => (
                    <Ionicons
                        name="close"
                        className="text-2xl"
                        onPress={router.back}
                        suppressHighlighting
                    />
                ),
            }}
        />
    );
};
