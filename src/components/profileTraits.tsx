import { Profile } from "@/types/profile";
import { cn } from "@/utils/cn";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { FC } from "react";
import { ScrollView, Text, View } from "react-native";

interface Props {
    profile: Profile;
}

export const ProfileTraits: FC<Props> = ({ profile }) => {
    return (
        <View className="bg-white border border-neutral-200 rounded-lg">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {profile?.traits.map(({ key, icon, label }, index) => {
                    if (!label) return null;

                    const isInMaterialIcons = Object.keys(MaterialIcons.glyphMap).includes(icon);

                    return (
                        <View key={key} className="py-2">
                            <View
                                className={cn(
                                    "flex-row items-center gap-2 px-5 py-2  border-gray-300",
                                    { "border-r-[0.25px]": index !== profile.traits.length - 1 },
                                )}
                            >
                                {isInMaterialIcons ? (
                                    <MaterialIcons
                                        name={icon as keyof typeof MaterialIcons.glyphMap}
                                        size={24}
                                    />
                                ) : (
                                    <MaterialCommunityIcons
                                        name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
                                        size={24}
                                    />
                                )}
                                <Text>{label}</Text>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};
