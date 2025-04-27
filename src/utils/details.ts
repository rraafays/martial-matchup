import { PrivateProfile } from "@/api/my-profile/types";
import { age } from "@/utils/age";

export const details = [
    {
        title: "Name",
        getValue: (profile: PrivateProfile) => {
            return profile?.name || "None";
        },
        route: "/profile/name",
    },
    {
        title: "Age",
        getValue: (profile: PrivateProfile) => {
            return profile?.date_of_birth ? age(profile?.date_of_birth) : "None";
        },
        route: "/profile/age",
    },
    {
        title: "Height",
        getValue: (profile: PrivateProfile) => {
            return profile?.height_cm ? profile?.height_cm + " cm" : "None";
        },
        route: "/profile/height",
    },
    {
        title: "Weight",
        getValue: (profile: PrivateProfile) => {
            return profile?.weight_kg ? profile?.weight_kg + " kg" : "None";
        },
        route: "/profile/weight",
    },
    {
        title: "Location",
        getValue: (profile: PrivateProfile) => {
            return profile?.neighborhood || "None";
        },
        route: "/profile/location",
    },
    {
        title: "Fighting Style",
        getValue: (profile: PrivateProfile) => {
            return profile?.fighting_style?.name || "None";
        },
        route: "/profile/fighting-style",
    },
    {
        title: "Fight Type",
        getValue: (profile: PrivateProfile) => {
            return profile?.fight_type?.name || "None";
        },
        route: "/profile/fight-type",
    },
    {
        title: "Years of Experience",
        getValue: (profile: PrivateProfile) => {
            return profile?.years_of_experience.toString() || "None";
        },
        route: "/profile/experience",
    },
];
