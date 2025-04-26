export interface PrivateProfile {
    id: string;
    name: string;
    date_of_birth: string;
    height_cm: number;
    weight_kg: number;
    neighborhood: string;
    latitude: number;
    longitude: number;
    max_distance_km: number;
    phone: string;
    years_of_experience: number;
    fighting_style: Option | null;
    fight_type: Option | null;
    photos: Photo[];
    avatar_url: string;
}

export interface FightingStyle {
    id: number;
    name: string;
}

export interface FightType {
    id: number;
    type: string;
}

export interface Photo {
    id: string;
    photo_url: string;
    photo_order: number;
}

export interface Option {
    id: number;
    name: string;
    plural_name?: string;
}
