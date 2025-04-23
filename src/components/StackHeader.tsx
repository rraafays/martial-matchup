import { router, Stack } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {}

export const StackHeader: FC<Props> = () => {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    title: "",
                    headerRight: () => (
                        <Ionicons
                            name="close"
                            className="text-3xl"
                            onPress={router.back}
                            suppressHighlighting
                        />
                    ),
                    headerShadowVisible: false,
                }}
            />
        </View>
    );
};
