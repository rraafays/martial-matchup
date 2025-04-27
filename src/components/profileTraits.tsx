import { Profile } from "@/types/profile";
import { cn } from "@/utils/cn";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FC } from "react";
import { ScrollView, Text, View } from "react-native";
import colors from "tailwindcss/colors";

interface Props {
    profile: Profile;
}

export const ProfileTraits: FC<Props> = ({ profile }) => {
    return (
        <View className="bg-black rounded-lg p-3">
            <ScrollView showsVerticalScrollIndicator={false}>
                {profile?.traits.map(({ key, name, icon, label }, index) => {
                    if (!label) return null;

                    const isInMaterialIcons = Object.keys(MaterialIcons.glyphMap).includes(icon);

                    return (
                        <View
                            key={key}
                            className={cn("mb-3 last:mb-0", {
                                "pb-3": index !== profile.traits.length - 1,
                            })}
                        >
                            <View className="flex-row items-center justify-between px-2 py-1">
                                <View className="flex-row items-center gap-3">
                                    <View className="bg-black p-2 rounded-full">
                                        {isInMaterialIcons ? (
                                            <MaterialIcons
                                                name={icon as keyof typeof MaterialIcons.glyphMap}
                                                size={24}
                                                color={colors.white}
                                            />
                                        ) : (
                                            <MaterialCommunityIcons
                                                name={
                                                    icon as keyof typeof MaterialCommunityIcons.glyphMap
                                                }
                                                size={24}
                                                color={colors.white}
                                            />
                                        )}
                                    </View>
                                    <Text className="text-white font-poppins-medium text-lg">
                                        {label}
                                    </Text>
                                </View>
                                <Text className="text-white font-poppins-regular text-xs">
                                    {name}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};
