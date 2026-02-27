import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemType',
    standalone: true
})
export class ItemTypePipe implements PipeTransform {
    private readonly typeMapping: Record<string, string> = {
        'Sword': '劍',
        'Axe': '斧頭',
        'Dagger': '匕首',
        'Mace': '釘頭錘',
        'Spear': '矛',
        'Bow': '弓',
        'Staff': '魔杖',
        'Wand': '法杖',
        'Crossbow': '十字弓',
        'Gun': '槍械',
        'Instrument': '樂器',
        'Dual Wield': '雙持',
        'Catalyst': '觸媒',
        'Herbal Medicine': '草藥',
        'Potion': '藥劑',
        'Spell': '法術',
        'Heavy Armor': '重甲',
        'Light Armor': '輕甲',
        'Clothes': '服飾',
        'Helmet': '頭盔',
        'Rogue Hat': '遊俠帽',
        'Magician Hat': '魔法師帽',
        'Gauntlets': '護手',
        'Gloves': '手套',
        'Heavy Footwear': '重型鞋類',
        'Light Footwear': '輕型鞋類',
        'Shield': '盾牌',
        'Quiver': '箭袋',
        'Cloak': '披風',
        'Idol': '神像',
        'Ring': '戒指',
        'Amulet': '護身符',
        'Familiar': '使魔',
        'Meal': '正餐',
        'Dessert': '點心',
        'Aurasong': '光環之歌',
        'Runestone': '符文',
        'Moonstone': '月石',
        'Enchantment': '附魔'
    };

    transform(value: string): string {
        if (!value) return '';
        return this.typeMapping[value] || value; // Fallback to english name if not found
    }
}
