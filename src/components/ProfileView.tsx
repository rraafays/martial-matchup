import { Profile } from "@/types/profile";
import { FC } from "react";
import { ScrollView, Text } from "react-native";
import { ProfileItem } from "./ProfileItem";
import { ProfilePhoto } from "./profilePhoto";
import { ProfileTraits } from "./profileTraits";

interface Props {
    profile: Profile;
    myProfile?: boolean;
    onChallenge?: (id: string, type: "photo") => void;
}

export const ProfileView: FC<Props> = ({ profile, myProfile, onChallenge }) => {
    const generateProfile = (): JSX.Element[] => {
        const elements: JSX.Element[] = [];

        const layout: ("photo" | "traits")[] = [
            "photo",
            "traits",
            "photo",
            "photo",
            "photo",
            "photo",
            "photo",
        ];

        const { photos } = profile;
        let photoIndex = 0;

        layout.forEach((item, _) => {
            if (item === "traits") {
                elements.push(<ProfileTraits key={item} profile={profile} />);
            }
            if (item === "photo" && photoIndex < photos.length) {
                const item = photos[photoIndex++];
                elements.push(
                    <ProfileItem
                        key={`p${item.id}`}
                        onChallenge={onChallenge}
                        item={item}
                        type="photo"
                    >
                        <ProfilePhoto photo={item} />
                    </ProfileItem>,
                );
            }
        });

        return elements;
    };
    return (
        <ScrollView
            className="flex-1"
            contentContainerClassName="pt-5 pb-28 gap-5"
            showsVerticalScrollIndicator={false}
        >
            {!myProfile && <Text className="text-3xl  font-poppins-semibold">{profile.name}</Text>}
            {generateProfile()}
        </ScrollView>
    );
};
