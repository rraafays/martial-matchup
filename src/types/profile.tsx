export interface Profile {
    id: string;
    name: string;
    photos: Photo[];
    traits: Trait[];
}

export interface Trait {
    key: string;
    icon: string;
    label: string | null;
}

export interface Photo {
    id: string;
    photo_url: string;
    photo_order: number;
}
