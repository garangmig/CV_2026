import type { SkillId } from "../data/skills";


export interface Skill {
    id: SkillId;
    name: string;
    shortName?: string;
    level: number;
    group: 'CLOUD' | 'DEVOPS' | 'DATABASE';
    icon?: {
        url: string;
        alt: string;
        title: string;
    };

}