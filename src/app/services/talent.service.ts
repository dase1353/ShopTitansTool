import { Injectable, signal, computed, effect } from '@angular/core';
import { TalentTree, TalentTreeType, TalentNode } from '../models/talent.model';
import { TRADING_TALENTS, QUESTING_TALENTS, CRAFTING_TALENTS } from '../data/talent-data';

@Injectable({
    providedIn: 'root'
})
export class TalentService {
    // Current state of the talent trees
    private tradingTree = signal<TalentTree>({ type: 'Trading', nodes: [], totalPoints: 0 });
    private questingTree = signal<TalentTree>({ type: 'Questing', nodes: [], totalPoints: 0 });
    private craftingTree = signal<TalentTree>({ type: 'Crafting', nodes: [], totalPoints: 0 });

    // Points configuration
    readonly hasAchievements = signal<boolean>(false);
    readonly totalAvailablePoints = computed(() => this.hasAchievements() ? 66 : 61);

    // Settings & State
    readonly isEditorEnabled = signal<boolean>(false);
    readonly activeTool = signal<'tree' | 'editor'>('tree');


    // Derived signals for the trees
    readonly trading = this.tradingTree.asReadonly();
    readonly questing = this.questingTree.asReadonly();
    readonly crafting = this.craftingTree.asReadonly();

    // Total points spent across all trees
    readonly spentPoints = computed(() => {
        return this.tradingTree().totalPoints +
            this.questingTree().totalPoints +
            this.craftingTree().totalPoints;
    });

    // Remaining points
    readonly remainingPoints = computed(() => {
        return this.totalAvailablePoints() - this.spentPoints();
    });

    // Editor state
    readonly editingNodeId = signal<string | null>(null);

    private isRestoringUrlBuild = false;

    constructor() {
        // Try to load autosave first
        const hasAutoSave = this.loadAutoSave();

        if (!hasAutoSave) {
            this.initTree('Trading', TRADING_TALENTS);
            this.initTree('Questing', QUESTING_TALENTS);
            this.initTree('Crafting', CRAFTING_TALENTS);
        }

        // Setup reactive autosave
        effect(() => {
            // By reading these signals, the effect tracks changes to them
            const trading = this.tradingTree();
            const questing = this.questingTree();
            const crafting = this.craftingTree();
            const achievements = this.hasAchievements();
            const editorEnabled = this.isEditorEnabled();

            if (!this.isRestoringUrlBuild) {
                this.saveAutoSave(trading, questing, crafting, achievements, editorEnabled);
            }
        });
    }

    private saveAutoSave(trading: TalentTree, questing: TalentTree, crafting: TalentTree, hasAchievements: boolean, isEditorEnabled: boolean) {
        try {
            const data = {
                trading: trading.nodes,
                questing: questing.nodes,
                crafting: crafting.nodes,
                hasAchievements: hasAchievements,
                isEditorEnabled: isEditorEnabled
            };
            localStorage.setItem('shoptitans_talent_autosave', JSON.stringify(data));
        } catch (e) {
            console.error('Failed to autosave', e);
        }
    }

    private loadAutoSave(): boolean {
        try {
            const dataStr = localStorage.getItem('shoptitans_talent_autosave');
            if (dataStr) {
                const data = JSON.parse(dataStr);
                if (data.trading && data.questing && data.crafting) {
                    this.tradingTree.set({ type: 'Trading', nodes: data.trading, totalPoints: this.calcTotalPoints(data.trading) });
                    this.questingTree.set({ type: 'Questing', nodes: data.questing, totalPoints: this.calcTotalPoints(data.questing) });
                    this.craftingTree.set({ type: 'Crafting', nodes: data.crafting, totalPoints: this.calcTotalPoints(data.crafting) });
                    this.hasAchievements.set(data.hasAchievements || false);
                    this.isEditorEnabled.set(data.isEditorEnabled || false);
                    return true;
                }
            }
        } catch (e) {
            console.error('Failed to load autosave', e);
        }
        return false;
    }

    /**
     * Initialize a tree with data
     */
    initTree(type: TalentTreeType, nodes: TalentNode[]) {
        const totalPoints = nodes.reduce((sum, node) => sum + node.level, 0);
        const tree: TalentTree = { type, nodes, totalPoints };

        switch (type) {
            case 'Trading': this.tradingTree.set(tree); break;
            case 'Questing': this.questingTree.set(tree); break;
            case 'Crafting': this.craftingTree.set(tree); break;
        }
    }

    /**
     * Level up a specific node
     */
    levelUpNode(treeType: TalentTreeType, nodeId: string): boolean {
        const tree = this.getTreeSignal(treeType);
        const currentTree = tree();

        const nodeIndex = currentTree.nodes.findIndex(n => n.id === nodeId);
        if (nodeIndex === -1) return false;

        const node = currentTree.nodes[nodeIndex];

        // Basic Validations
        if (node.level >= node.maxLevel) return false;
        if (this.remainingPoints() <= 0) return false;
        if (!this.checkPrerequisites(currentTree, node)) return false;

        // Update the node level
        const updatedNodes = [...currentTree.nodes];
        updatedNodes[nodeIndex] = { ...node, level: node.level + 1 };

        // Update the tree signal
        tree.set({
            ...currentTree,
            nodes: updatedNodes,
            totalPoints: currentTree.totalPoints + 1
        });

        return true;
    }

    /**
     * Level down a specific node (refund point)
     */
    levelDownNode(treeType: TalentTreeType, nodeId: string): boolean {
        const tree = this.getTreeSignal(treeType);
        const currentTree = tree();

        const nodeIndex = currentTree.nodes.findIndex(n => n.id === nodeId);
        if (nodeIndex === -1) return false;

        const node = currentTree.nodes[nodeIndex];

        // Basic Validations
        if (node.level <= 0) return false;

        // Check if lowering this node breaks dependencies for active children
        const dependentNodes = currentTree.nodes.filter(n => n.prerequisites.includes(nodeId) && n.level > 0);

        for (const depNode of dependentNodes) {
            const prereqPointsIfRefunded = currentTree.nodes
                .filter(n => depNode.prerequisites.includes(n.id))
                .reduce((sum, n) => sum + (n.id === nodeId ? node.level - 1 : n.level), 0);
            if (prereqPointsIfRefunded < depNode.requiredPoints) {
                return false;
            }
        }

        // Refund the point
        const updatedNodes = [...currentTree.nodes];
        updatedNodes[nodeIndex] = { ...node, level: node.level - 1 };

        tree.set({
            ...currentTree,
            nodes: updatedNodes,
            totalPoints: currentTree.totalPoints - 1
        });

        return true;
    }

    /**
     * Check if all prerequisites are met for a node
     */
    private checkPrerequisites(tree: TalentTree, node: TalentNode): boolean {
        if (node.prerequisites.length === 0) return true;

        // Sum points from prerequisite nodes
        const prereqPoints = tree.nodes
            .filter(n => node.prerequisites.includes(n.id))
            .reduce((sum, n) => sum + n.level, 0);

        return prereqPoints >= node.requiredPoints;
    }

    /**
     * Resets all unlocked nodes to level 0
     */
    resetTree(treeType: TalentTreeType) {
        const tree = this.getTreeSignal(treeType);
        const currentTree = tree();

        const updatedNodes = currentTree.nodes.map(node => ({ ...node, level: 0 }));

        tree.set({
            ...currentTree,
            nodes: updatedNodes,
            totalPoints: 0
        });
    }

    addNode(treeType: TalentTreeType) {
        const tree = this.getTreeSignal(treeType);

        // Prevent adding multiple new nodes if one already exists
        const existingNewNode = tree().nodes.find(n => n.name === '新節點');
        if (existingNewNode) {
            this.editingNodeId.set(existingNewNode.id);
            return;
        }

        const offset = Math.floor(Math.random() * 40) - 20;

        let defaultIcon = '';
        if (treeType === 'Trading') defaultIcon = 'ShopTitansAssets/Misc Icons/icon_global_smalltalk.png';
        if (treeType === 'Questing') defaultIcon = 'ShopTitansAssets/Misc Icons/icon_global_quest.png';
        if (treeType === 'Crafting') defaultIcon = 'ShopTitansAssets/Misc Icons/icon_global_selector_tab_craft.png';

        const newNode: TalentNode = {
            id: `${treeType.toLowerCase()}_${Date.now()}`,
            name: '新節點',
            defaultactive: false,
            level: 0,
            maxLevel: 5,
            effect: [],
            icon: defaultIcon,
            prerequisites: [],
            requiredPoints: 0,
            position: { x: 460 + offset, y: 300 + offset }
        };
        tree.set({ ...tree(), nodes: [...tree().nodes, newNode] });
        this.editingNodeId.set(newNode.id);
    }

    updateNode(treeType: TalentTreeType, updatedNode: TalentNode) {
        const tree = this.getTreeSignal(treeType);
        const nodes = tree().nodes.map(n => n.id === updatedNode.id ? updatedNode : n);
        tree.set({ ...tree(), nodes });
    }

    deleteNode(treeType: TalentTreeType, nodeId: string) {
        const tree = this.getTreeSignal(treeType);
        const nodes = tree().nodes
            .filter(n => n.id !== nodeId)
            .map(n => ({
                ...n,
                prerequisites: n.prerequisites.filter(p => p !== nodeId)
            }));
        tree.set({ ...tree(), nodes });
        if (this.editingNodeId() === nodeId) this.editingNodeId.set(null);
    }

    resetAllTrees() {
        this.resetTree('Trading');
        this.resetTree('Questing');
        this.resetTree('Crafting');
    }

    restoreDefaultTree(treeType: TalentTreeType) {
        let defaultNodes: TalentNode[] = [];
        if (treeType === 'Trading') defaultNodes = TRADING_TALENTS;
        if (treeType === 'Questing') defaultNodes = QUESTING_TALENTS;
        if (treeType === 'Crafting') defaultNodes = CRAFTING_TALENTS;

        const tree = this.getTreeSignal(treeType);
        tree.set({ ...tree(), nodes: JSON.parse(JSON.stringify(defaultNodes)), totalPoints: 0 });
        this.editingNodeId.set(null);
    }

    // --- Share / Export / Import ---
    exportBuildToUrl(): string {
        const build: Record<string, number> = {};

        const extract = (tree: { nodes: TalentNode[] }) => {
            tree.nodes.forEach(n => {
                if (n.level > 0 && n.id && !n.id.includes('root') && !n.id.includes('reset')) {
                    build[n.id] = n.level;
                }
            });
        };

        extract(this.tradingTree());
        extract(this.questingTree());
        extract(this.craftingTree());

        if (Object.keys(build).length === 0) return '';

        try {
            const jsonStr = JSON.stringify(build);
            const b64 = btoa(jsonStr);
            const protocolAndHost = window.location.protocol + '//' + window.location.host;
            return `${protocolAndHost}/talent?build=${b64}`;
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    importBuildFromUrl(base64Str: string): boolean {
        this.isRestoringUrlBuild = true;
        try {
            const jsonStr = atob(base64Str);
            const build: Record<string, number> = JSON.parse(jsonStr);

            const applyLevels = (treeType: TalentTreeType) => {
                const treeSig = this.getTreeSignal(treeType);
                const currentTree = treeSig();
                let hasChanges = false;

                const updatedNodes = currentTree.nodes.map(n => {
                    if (build[n.id] !== undefined) {
                        hasChanges = true;
                        return { ...n, level: build[n.id] };
                    }
                    if (n.id.includes('root') || n.id.includes('reset')) {
                        return n;
                    }
                    return { ...n, level: 0 };
                });

                if (hasChanges || currentTree.totalPoints > 0) {
                    treeSig.set({
                        ...currentTree,
                        nodes: updatedNodes,
                        totalPoints: this.calcTotalPoints(updatedNodes)
                    });
                }
            };

            applyLevels('Trading');
            applyLevels('Questing');
            applyLevels('Crafting');

            this.isRestoringUrlBuild = false;
            // Force an autosave now that url build is fully loaded
            this.saveAutoSave(this.tradingTree(), this.questingTree(), this.craftingTree(), this.hasAchievements(), this.isEditorEnabled());
            return true;
        } catch (e) {
            console.error('Failed to import build', e);
            this.isRestoringUrlBuild = false;
            return false;
        }
    }

    // --- Save / Load Profiles ---
    getSavedProfiles(): string[] {
        try {
            const data = localStorage.getItem('shoptitans_talent_profiles');
            if (data) return Object.keys(JSON.parse(data));
        } catch (e) {
            console.error(e);
        }
        return [];
    }

    saveProfile(name: string) {
        try {
            const currentData = localStorage.getItem('shoptitans_talent_profiles');
            const profiles = currentData ? JSON.parse(currentData) : {};
            profiles[name] = {
                name,
                trading: this.tradingTree().nodes,
                questing: this.questingTree().nodes,
                crafting: this.craftingTree().nodes,
                hasAchievements: this.hasAchievements()
            };
            localStorage.setItem('shoptitans_talent_profiles', JSON.stringify(profiles));
            return true;
        } catch (e) {
            console.error("Failed to save", e);
            return false;
        }
    }

    loadProfile(name: string): boolean {
        try {
            const data = localStorage.getItem('shoptitans_talent_profiles');
            if (!data) return false;
            const profiles = JSON.parse(data);
            if (profiles[name]) {
                const p = profiles[name];
                this.tradingTree.set({ type: 'Trading', nodes: p.trading, totalPoints: this.calcTotalPoints(p.trading) });
                this.questingTree.set({ type: 'Questing', nodes: p.questing, totalPoints: this.calcTotalPoints(p.questing) });
                this.craftingTree.set({ type: 'Crafting', nodes: p.crafting, totalPoints: this.calcTotalPoints(p.crafting) });
                this.hasAchievements.set(p.hasAchievements || false);
                this.editingNodeId.set(null);
                return true;
            }
        } catch (e) {
            console.error("Failed to load", e);
        }
        return false;
    }

    deleteProfile(name: string) {
        try {
            const data = localStorage.getItem('shoptitans_talent_profiles');
            if (!data) return;
            const profiles = JSON.parse(data);
            if (profiles[name]) {
                delete profiles[name];
                localStorage.setItem('shoptitans_talent_profiles', JSON.stringify(profiles));
            }
        } catch (e) {
            console.error("Failed to delete", e);
        }
    }

    private calcTotalPoints(nodes: TalentNode[]): number {
        return nodes.reduce((sum, n) => sum + (n.level || 0), 0);
    }

    private getTreeSignal(type: TalentTreeType) {
        switch (type) {
            case 'Trading': return this.tradingTree;
            case 'Questing': return this.questingTree;
            case 'Crafting': return this.craftingTree;
        }
    }
}
