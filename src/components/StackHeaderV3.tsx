import { Stack } from "expo-router";
import { FC } from "react";
import { Pressable, Text } from "react-native";

interface Props {
    title?: string;
    onPressCancel?: () => void;
    onPressDone?: () => void;
}

export const StackHeaderV3: FC<Props> = ({ title, onPressCancel, onPressDone }) => {
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                title: title,
                headerTitleAlign: "center",
                headerLeft: () => (
                    <Pressable onPress={onPressCancel}>
                        <Text className="font-semibold text-black">Cancel</Text>
                    </Pressable>
                ),
                headerRight: () => (
                    <Pressable onPress={onPressDone}>
                        <Text className="font-semibold text-black">Done</Text>
                    </Pressable>
                ),

                headerShadowVisible: false,
            }}
        />
    );
};
