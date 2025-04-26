export interface Challenge {
    id: string;
    photo_url: string | null;
    profile: PublicProfile;
}

export interface PublicProfile {
    id: string;
    age: number;
    photos: Photo[];
    fighting_style: string;
    fight_type: string;
    height_cm: number;
    weight_kg: number;
    years_of_experience: number;
    name: string;
    neighborhood: string;
}

export interface Photo {
    id: string;
    photo_url: string;
    photo_order: number;
}
