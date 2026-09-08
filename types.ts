export interface ElementItem {
    id: string;
    title: string;
    description: string;
    image: string;
    icon: string;
}

export interface Amenity {
    title: string;
    distance: string;
}

export interface AmenityCategory {
    category: string;
    items: Amenity[];
}