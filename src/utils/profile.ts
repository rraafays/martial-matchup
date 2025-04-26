import { PrivateProfile } from "@/api/my-profile/types";
import { PublicProfile } from "@/api/profiles/types";
import { Profile } from "@/types/profile";
import { age } from "./age";

const traitsMapping = [
    {
        key: "date_of_birth",
        icon: "calendar-outline",
        privateLabel: (profile: PrivateProfile) =>
            profile.date_of_birth ? `${age(profile.date_of_birth)}` : null,
        publicLabel: (profile: PublicProfile) => (profile.age ? `${profile.age.toString()}` : null),
    },
    {
        key: "height_cm",
        icon: "resize-outline",
        privateLabel: (profile: PrivateProfile) =>
            profile.height_cm ? `${profile.height_cm} cm` : null,
        publicLabel: (profile: PublicProfile) =>
            profile.height_cm ? `${profile.height_cm} cm` : null,
    },
    {
        key: "weight_kg",
        icon: "resize-outline",
        privateLabel: (profile: PrivateProfile) =>
            profile.weight_kg ? `${profile.weight_kg} kg` : null,
        publicLabel: (profile: PublicProfile) =>
            profile.weight_kg ? `${profile.weight_kg} kg` : null,
    },
    {
        key: "location",
        icon: "location-outline",
        privateLabel: (profile: PrivateProfile) => profile.neighborhood,
        publicLabel: (profile: PublicProfile) => profile.neighborhood,
    },
    {
        key: "fighting_style",
        icon: "cart-outline",
        privateLabel: (profile: PrivateProfile) => profile.fighting_style?.name,
        publicLabel: (profile: PublicProfile) => profile.fighting_style || null,
    },
    {
        key: "fight_type",
        icon: "cart-outline",
        privateLabel: (profile: PrivateProfile) => profile.fight_type?.name,
        publicLabel: (profile: PublicProfile) => profile.fight_type || null,
    },
];

export const transformPrivateProfile = (profile: PrivateProfile): Profile => {
    return {
        id: profile.id,
        name: profile.name,
        photos: profile.photos,
        traits: traitsMapping.map((trait) => {
            const label = trait.privateLabel(profile);
            return {
                key: trait.key,
                icon: trait.icon,
                label: label || null,
            };
        }),
    };
};

export const transformPublicProfile = (profile: PublicProfile): Profile => {
    return {
        id: profile.id,
        name: profile.name,
        photos: profile.photos,
        traits: traitsMapping.map((trait) => {
            const label = trait.publicLabel(profile);
            return {
                key: trait.key,
                icon: trait.icon,
                label: label || null,
            };
        }),
    };
};
