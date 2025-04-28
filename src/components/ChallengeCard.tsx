import { Challenge } from "@/api/profiles/types";
import { Image } from "expo-image";
import { FC } from "react";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

interface Props {
    challenge: Challenge;
}

export const ChallengeCard: FC<Props> = ({ challenge: { profile } }) => {
    return (
        <View className="bg-black flex-1 rounded-lg overflow-hidden border">
            <View className="p-4 gap-5">
                <Text className="text-xl font-poppins-medium text-white">{profile.name}</Text>
            </View>
            <View className="flex-1 aspect-square w-full">
                <Image source={profile.photos[0].photo_url} className="flex-1" />
            </View>
        </View>
    );
};
