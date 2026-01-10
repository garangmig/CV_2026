export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string; // Aquí irá el Markdown
    tags: string[];
    icon?: string; // Material Symbol name
    media: {
        id: number;
        type: 'image' | 'video';
        url: string;
        alt: string;
        title: string;
    }[];
    links: {
        github?: string;
        demo?: string;
        docs?: string;
    };
    metrics?: {
        name: string;
        value: string;
        number?: number;
        unit?: string;
        description?: string;
    }[];
}