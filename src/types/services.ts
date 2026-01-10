import type { SkillId } from "../data/skills";

export interface Service {
    id: string;
    title: string;
    description?: string;
    scope: string;
    achievement: string;
    tags?: string[];
    date: string;
    icon: {
        url: string;
        alt: string;
        title: string;
    };
    skillsUsed: SkillId[];

}