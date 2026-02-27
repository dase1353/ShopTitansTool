import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'materialName',
    standalone: true
})
export class MaterialNamePipe implements PipeTransform {
    private readonly materialKeys = new Set([
        'Elven Wood', 'Iron Pine Cone', 'Glow Shroom', 'Silver Dust', 'Precious Gem',
        'Webbed Wing', 'Living Root', 'Rustwyrm Scale', 'Deep Pearl', 'Moon Crystal',
        'Bronze Fang', 'White Sand', 'Evil Eye', 'Silk Scarab', 'Star Metal',
        'Chronos Crystal', 'Ancient Marble', 'Overgrown Vine', 'Thread of Fate',
        'Spooky Ectoplasm', 'Ghastly Pennant', 'Deep Coral', 'Crystal Lullaby',
        'Precious Shell', 'Grim Talon', 'Zirconia Eggshell', 'Boreal Gale',
        'Crush Claw', 'Crushed Claw', 'Raw Obsidian', 'Magma Core', 'Sigil of Might',
        'Sigil of Spark', 'Sigil of Grace', "Outsider's Claw", 'All-Seeing Eye',
        'Astral Fabric', 'Platinum Bangles', 'Sigil of True Might', 'Sigil of True Spark',
        'Sigil of True Grace', 'Demigod Pinion', "Heaven's Crest", 'Divine Spark',
        'Man-goroots', 'Full Moon Crystal', 'Star Metal Ingot', 'Kingtoplasm',
        'Marble Pillar', 'Elder Wood', 'Dinosaur Leather', 'Ancient Amber',
        'Mysterious Fossil', 'Golden Chunk', 'Opulent Jewel', 'Deterioriated Book',
        'Rusted Pickaxe', 'Faded Cowl', 'Tattered Binder', 'Broken Torc',
        'Rusted Katana', 'Ruined Mace', 'Rusted Tassets', 'Rusted Cannon', 'Chunk of Boots'
    ]);

    transform(value: string | undefined | null): string {
        if (!value) return '';
        if (this.materialKeys.has(value)) {
            const key = value.toUpperCase().replace(/[\s-]/g, '_').replace(/'/g, '');
            return `MATERIAL.${key}`;
        }
        return value;
    }
}
