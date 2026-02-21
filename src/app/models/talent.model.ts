export interface TalentEffect {
    level: number;
    effect: string;
}

export interface TalentNode {
    id: string;
    name: string;
    defaultactive: boolean;
    level: number;
    maxLevel: number;
    effect: TalentEffect[];
    icon: string;
    prerequisites: string[]; // IDs of prerequisite nodes
    requiredPoints: number; // Cumulative points needed from prerequisites
    position: { x: number; y: number }; // For rendering the tree
    isSpecial?: boolean; // For nodes with special VFX
}

export type TalentTreeType = 'Trading' | 'Questing' | 'Crafting';

export interface TalentTree {
    type: TalentTreeType;
    nodes: TalentNode[];
    totalPoints: number;
}
