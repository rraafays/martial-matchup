import { FC } from "react";
import { Text, View } from "react-native";

interface Props {}

export const ProfilePhotos: FC<Props> = () => {
    return (
        <View className="flex flex-col gap-2">
            <Text>photos</Text>
        </View>
    );
};
