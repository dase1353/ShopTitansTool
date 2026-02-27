import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'materialName',
    standalone: true
})
export class MaterialNamePipe implements PipeTransform {
    private readonly materialMap: Record<string, string> = {
        'Elven Wood': '精靈之木',
        'Iron Pine Cone': '鐵松果',
        'Glow Shroom': '發光蘑菇',
        'Silver Dust': '銀粉',
        'Precious Gem': '珍貴寶石',
        'Webbed Wing': '蹼翼',
        'Living Root': '活根',
        'Rustwyrm Scale': '銹紅雙足飛龍鱗片',
        'Deep Pearl': '深水珍珠',
        'Moon Crystal': '月之水晶',
        'Bronze Fang': '銅牙',
        'White Sand': '白沙',
        'Evil Eye': '邪眼',
        'Silk Scarab': '絲聖甲蟲',
        'Star Metal': '星金屬',
        'Chronos Crystal': '時空水晶',
        'Ancient Marble': '古代大理石',
        'Overgrown Vine': '瘋長藤蔓',
        'Thread of Fate': '命運之線',
        'Spooky Ectoplasm': '詭異靈質',
        'Ghastly Pennant': '奇怪三角旗',
        'Deep Coral': '深水珊瑚',
        'Crystal Lullaby': '水晶搖籃曲',
        'Precious Shell': '珍貴貝殼',
        'Grim Talon': '無情利爪',
        'Zirconia Eggshell': '石蛋殼',
        'Boreal Gale': '凜冽北風',
        'Crush Claw': '粉碎蟹爪',
        'Crushed Claw': '粉碎蟹爪',
        'Raw Obsidian': '原始黑曜岩',
        'Magma Core': '岩漿核心',
        'Sigil of Might': '火花之符',
        'Sigil of Spark': '恩典之符',
        'Sigil of Grace': '威力之符',
        "Outsider's Claw": '外人之爪',
        'All-Seeing Eye': '全視之眼',
        'Astral Fabric': '星雲布料',
        'Platinum Bangles': '白金手鐲',
        'Sigil of True Might': '真實火花之符',
        'Sigil of True Spark': '真實恩典之符',
        'Sigil of True Grace': '真實威力之符',
        'Demigod Pinion': '半神之翼',
        "Heaven's Crest": '天堂紋章',
        'Divine Spark': '神聖火星',
        'Man-goroots': '曼德拉草根',
        'Full Moon Crystal': '滿月水晶',
        'Star Metal Ingot': '星金屬鑄塊',
        'Kingtoplasm': '國王靈質',
        'Marble Pillar': '大理石柱',
        'Elder Wood': '神木',
        'Dinosaur Leather': '恐龍皮革',
        'Ancient Amber': '古代琥珀',
        'Mysterious Fossil': '神秘化石',

        'Golden Chunk': '金碎塊',
        'Opulent Jewel': '富足寶珠',

        'Deterioriated Book': '老舊書本',
        'Deteriorated Book': '老舊書本',
        'Rusted Pickaxe': '生鏽鶴嘴鋤',
        'Faded Cowl': '褪色兜帽',
        'Tattered Binder': '破舊收藏冊',
        'Broken Torc': '破損項圈',
        'Rusted Katana': '生鏽武士刀',
        'Ruined Mace': '破損釘錘',
        'Rusted Tassets': '生鏽護甲',
        'Rusted Cannon': '生鏽大砲',
        'Chunk of Boots': '靴子碎塊',
    };

    transform(value: string | undefined | null): string {
        if (!value) return '';
        return this.materialMap[value] || value;
    }
}
