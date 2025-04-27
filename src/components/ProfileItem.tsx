import { Photo } from "@/types/profile";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import { ForwardActionButton } from "./ForwardActionButton";

interface Props {
    children: ReactNode;
    item: Photo;
    type: "photo";
    onChallenge?: (id: string, type: "photo") => void;
}

export const ProfileItem: FC<Props> = ({ children, item, type, onChallenge }) => {
    return (
        <View>
            {children}
            {onChallenge && (
                <ForwardActionButton
                    className="absolute bottom-5 right-5 bg-black shadow-sm"
                    iconName="skull-outline"
                    iconClassName="text-white text-4xl"
                    onPress={() => onChallenge(item.id, type)}
                />
            )}
        </View>
    );
};
