import { PrivateProfile } from "@/api/my-profile/types";
import { PublicProfile } from "@/api/profiles/types";
import { Profile } from "@/types/profile";
import { age } from "./age";

const traitsMapping = [
    {
        key: "weight_kg",
        name: "Weight",
        icon: "weight",
        privateLabel: (profile: PrivateProfile) =>
            profile.weight_kg ? `${profile.weight_kg} kg` : null,
        publicLabel: (profile: PublicProfile) =>
            profile.weight_kg ? `${profile.weight_kg} kg` : null,
    },
    {
        key: "height_cm",
        name: "Height",
        icon: "height",
        privateLabel: (profile: PrivateProfile) =>
            profile.height_cm ? `${profile.height_cm} cm` : null,
        publicLabel: (profile: PublicProfile) =>
            profile.height_cm ? `${profile.height_cm} cm` : null,
    },
    {
        key: "years_of_experience",
        name: "Years of Experience",
        icon: "timer-sand-complete",
        privateLabel: (profile: PrivateProfile) => profile.years_of_experience.toString(),
        publicLabel: (profile: PublicProfile) => profile.years_of_experience.toString() || null,
    },
    {
        key: "fighting_style",
        name: "Style",
        icon: "sports-martial-arts",
        privateLabel: (profile: PrivateProfile) => profile.fighting_style?.name,
        publicLabel: (profile: PublicProfile) => profile.fighting_style || null,
    },
    {
        key: "fight_type",
        name: "Event",
        icon: "tournament",
        privateLabel: (profile: PrivateProfile) => profile.fight_type?.name,
        publicLabel: (profile: PublicProfile) => profile.fight_type || null,
    },
    {
        key: "date_of_birth",
        name: "Age",
        icon: "cake",
        privateLabel: (profile: PrivateProfile) =>
            profile.date_of_birth ? `${age(profile.date_of_birth)}` : null,
        publicLabel: (profile: PublicProfile) => (profile.age ? `${profile.age.toString()}` : null),
    },
    {
        key: "location",
        name: "Region",
        icon: "earth",
        privateLabel: (profile: PrivateProfile) => profile.neighborhood,
        publicLabel: (profile: PublicProfile) => profile.neighborhood,
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
                name: trait.name,
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
                name: trait.name,
                icon: trait.icon,
                label: label || null,
            };
        }),
    };
};
