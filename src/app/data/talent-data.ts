import { TalentNode } from '../models/talent.model';

const ASSET_PATH = 'ShopTitansAssets/Talent Tree';

export const TRADING_TALENTS: TalentNode[] = [
    {
        "id": "trading_root",
        "name": "交易",
        "defaultactive": true,
        "level": 0,
        "maxLevel": 0,
        "effect": [],
        "icon": "ShopTitansAssets/Misc Icons/icon_global_smalltalk.png",
        "prerequisites": [],
        "requiredPoints": 0,
        "position": {
            "x": 450,
            "y": 50
        }
    },
    {
        "id": "trading_reset",
        "name": "重設",
        "defaultactive": true,
        "level": 0,
        "maxLevel": 0,
        "effect": [],
        "icon": "ShopTitansAssets/Misc Icons/icon_reset.svg",
        "prerequisites": [
            "trading_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 600,
            "y": 50
        }
    },
    {
        "id": "trading_1771685526966",
        "name": "充滿能量",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_maxEnergy.png",
        "prerequisites": [
            "trading_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 450,
            "y": 150
        }
    },
    {
        "id": "trading_1771685599516",
        "name": "天王魅力",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_sellEnergy.png",
        "prerequisites": [
            "trading_1771685526966",
            "trading_1771685624863"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 250,
            "y": 250
        }
    },
    {
        "id": "trading_1771685624863",
        "name": "戰鬥商場",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bonusWarrior.png",
        "prerequisites": [
            "trading_1771685526966",
            "trading_1771685599516"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 350,
            "y": 350
        }
    },
    {
        "id": "trading_1771685642241",
        "name": "俠客反斗城",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bonusRogue.png",
        "prerequisites": [
            "trading_1771685526966"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 450,
            "y": 350
        }
    },
    {
        "id": "trading_1771685659120",
        "name": "咒語、法袍、更高境界",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bonusMage.png",
        "prerequisites": [
            "trading_1771685526966",
            "trading_1771685682406"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 550,
            "y": 350
        }
    },
    {
        "id": "trading_1771685682406",
        "name": "翻倍或沒搞頭",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_npcVisitorDoubleSale.png",
        "prerequisites": [
            "trading_1771685526966",
            "trading_1771685659120"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 650,
            "y": 250
        }
    },
    {
        "id": "trading_1771686562085",
        "name": "有聲睡眠者",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_staminaRegen.png",
        "prerequisites": [
            "trading_1771685599516",
            "trading_1771685624863",
            "trading_1771686637959"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 250,
            "y": 470
        }
    },
    {
        "id": "trading_1771686637959",
        "name": "準備出貨",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_tradeSlotCapacity.png",
        "prerequisites": [
            "trading_1771685624863",
            "trading_1771685642241",
            "trading_1771686562085"
        ],
        "requiredPoints": 4,
        "position": {
            "x": 350,
            "y": 470
        }
    },
    {
        "id": "trading_1771686787007",
        "name": "不含稅",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_discountValue.png",
        "prerequisites": [
            "trading_1771685642241",
            "trading_1771685659120",
            "trading_1771686802325"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 550,
            "y": 470
        }
    },
    {
        "id": "trading_1771686802325",
        "name": "一日遞送",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_resourceWorkerQty.png",
        "prerequisites": [
            "trading_1771685659120",
            "trading_1771685682406",
            "trading_1771686787007"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 650,
            "y": 470
        }
    },
    {
        "id": "trading_1771686835111",
        "name": "超強",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_staminaIncrease.png",
        "prerequisites": [
            "trading_1771686562085",
            "trading_1771686637959"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 350,
            "y": 600
        }
    },
    {
        "id": "trading_1771686843087",
        "name": "友好互助",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_championRequestDemand.png",
        "prerequisites": [
            "trading_1771686787007",
            "trading_1771686802325"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 550,
            "y": 600
        }
    },
    {
        "id": "trading_1771686868332",
        "name": "做假帳",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 1,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bountyExtraTrophy.png",
        "prerequisites": [
            "trading_1771686835111"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 250,
            "y": 700
        }
    },
    {
        "id": "trading_1771686897047",
        "name": "品牌忠誠",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_freeSurcharge.png",
        "prerequisites": [
            "trading_1771686835111",
            "trading_1771686843087"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 450,
            "y": 700
        }
    },
    {
        "id": "trading_1771686928455",
        "name": "一流中的一流",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_npcSellEnchanted.png",
        "prerequisites": [
            "trading_1771686843087"
        ],
        "requiredPoints": 2,
        "position": {
            "x": 700,
            "y": 700
        }
    },
    {
        "id": "trading_1771686979793",
        "name": "王家的顧問",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_kingSuggest.png",
        "prerequisites": [
            "trading_1771686835111"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 350,
            "y": 800
        },
        "isSpecial": true
    },
    {
        "id": "trading_1771687004697",
        "name": "附魔機構",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_enchantedSurchargeValue.png",
        "prerequisites": [
            "trading_1771686897047"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 450,
            "y": 900
        },
        "isSpecial": true
    },
    {
        "id": "trading_1771687037431",
        "name": "王者歸來",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_kingReturn.png",
        "prerequisites": [
            "trading_1771686843087"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 550,
            "y": 800
        },
        "isSpecial": true
    }
];

export const QUESTING_TALENTS: TalentNode[] = [
    {
        "id": "questing_root",
        "name": "任務",
        "defaultactive": true,
        "level": 0,
        "maxLevel": 0,
        "effect": [],
        "icon": "ShopTitansAssets/Misc Icons/icon_global_quest.png",
        "prerequisites": [],
        "requiredPoints": 0,
        "position": {
            "x": 450,
            "y": 50
        }
    },
    {
        "id": "questing_reset",
        "name": "重設",
        "defaultactive": true,
        "level": 0,
        "maxLevel": 0,
        "effect": [],
        "icon": "ShopTitansAssets/Misc Icons/icon_reset.svg",
        "prerequisites": [
            "questing_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 600,
            "y": 50
        }
    },
    {
        "id": "questing_1771690002490",
        "name": "寶藏獵人",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bonusChestChance.png",
        "prerequisites": [
            "questing_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 350,
            "y": 200
        }
    },
    {
        "id": "questing_1771690015954",
        "name": "普通農民",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bonusComponent.png",
        "prerequisites": [
            "questing_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 450,
            "y": 180
        }
    },
    {
        "id": "questing_1771690030677",
        "name": "強化器返還",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_refundBooster.png",
        "prerequisites": [
            "questing_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 550,
            "y": 200
        }
    },
    {
        "id": "questing_1771690115799",
        "name": "艾許麗的決心",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_fasterBossQuest.png",
        "prerequisites": [
            "questing_1771690002490",
            "questing_1771690015954"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 300,
            "y": 350
        }
    },
    {
        "id": "questing_1771690145578",
        "name": "亞岡的最佳表現",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_heroHire.png",
        "prerequisites": [
            "questing_1771690115799",
            "questing_1771690189758"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 350
        },
        "isSpecial": true
    },
    {
        "id": "questing_1771690189758",
        "name": "比約恩的足跡",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_fasterFlashQuest.png",
        "prerequisites": [
            "questing_1771690015954",
            "questing_1771690030677"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 600,
            "y": 350
        }
    },
    {
        "id": "questing_1771690232254",
        "name": "神器獲取",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 1,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_lcogComponents.png",
        "prerequisites": [
            "questing_1771690339956"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 180,
            "y": 460
        }
    },
    {
        "id": "questing_1771690263393",
        "name": "路邊批發",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_betterOverflowValue.png",
        "prerequisites": [
            "questing_1771690339956",
            "questing_1771690370280"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 385,
            "y": 600
        }
    },
    {
        "id": "questing_1771690281181",
        "name": "地毯式搜索",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_findNothingChance.png",
        "prerequisites": [
            "questing_1771690370280",
            "questing_1771690408070"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 515,
            "y": 600
        }
    },
    {
        "id": "questing_1771690339956",
        "name": "失落之城突襲者",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_pureGoldBonus.png",
        "prerequisites": [
            "questing_1771690115799",
            "questing_1771690370280"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 320,
            "y": 460
        }
    },
    {
        "id": "questing_1771690370280",
        "name": "芙蕾亞的禱告",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_deadHeroesRest.png",
        "prerequisites": [
            "questing_1771690115799",
            "questing_1771690189758",
            "questing_1771690339956",
            "questing_1771690408070"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 459
        }
    },
    {
        "id": "questing_1771690408070",
        "name": "王國悍將",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_airshipBonus.png",
        "prerequisites": [
            "questing_1771690189758",
            "questing_1771690370280"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 580,
            "y": 460
        }
    },
    {
        "id": "questing_1771690439282",
        "name": "額外的任務體驗",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 1,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_questSlot.png",
        "prerequisites": [
            "questing_1771690263393"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 250,
            "y": 600
        },
        "isSpecial": true
    },
    {
        "id": "questing_1771690497870",
        "name": "只有閃亮亮",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_singularItemQuality.png",
        "prerequisites": [
            "questing_1771690281181"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 700,
            "y": 500
        }
    },
    {
        "id": "questing_1771690522314",
        "name": "翻倍包",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_doubleBundle.png",
        "prerequisites": [
            "questing_1771690281181"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 700,
            "y": 650
        }
    },
    {
        "id": "questing_1771690574815",
        "name": "成功之鑰",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_doubleKeyChance.png",
        "prerequisites": [
            "questing_1771690596456"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 200,
            "y": 900
        },
        "isSpecial": true
    },
    {
        "id": "questing_1771690596456",
        "name": "偶然準備",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_instantQuest.png",
        "prerequisites": [
            "questing_1771690263393",
            "questing_1771690625624",
            "questing_1771690687495"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 299,
            "y": 780
        }
    },
    {
        "id": "questing_1771690625624",
        "name": "千方百計",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 1,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_noStones.png",
        "prerequisites": [
            "questing_1771690596456",
            "questing_1771690663104"
        ],
        "requiredPoints": 2,
        "position": {
            "x": 450,
            "y": 730
        }
    },
    {
        "id": "questing_1771690663104",
        "name": "西亞的觸碰",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_doubleComponents.png",
        "prerequisites": [
            "questing_1771690281181",
            "questing_1771690625624"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 600,
            "y": 780
        }
    },
    {
        "id": "questing_1771690687495",
        "name": "如坐針氈",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_extremeBonus.png",
        "prerequisites": [
            "questing_1771690596456",
            "questing_1771690625624",
            "questing_1771690663104"
        ],
        "requiredPoints": 2,
        "position": {
            "x": 450,
            "y": 850
        }
    },
    {
        "id": "questing_1771690720396",
        "name": "再戰宿敵",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_bossRespawnChance.png",
        "prerequisites": [
            "questing_1771690596456"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 350,
            "y": 950
        },
        "isSpecial": true
    },
    {
        "id": "questing_1771690739874",
        "name": "泰坦調和",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 1,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_extraTitanSoul.png",
        "prerequisites": [
            "questing_1771690663104"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 550,
            "y": 950
        },
        "isSpecial": true
    },
    {
        "id": "questing_1771690760036",
        "name": "就是要奪寶",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_poloniaExtraLoot.png",
        "prerequisites": [
            "questing_1771690663104"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 700,
            "y": 900
        },
        "isSpecial": true
    }
];

export const CRAFTING_TALENTS: TalentNode[] = [
    {
        "id": "crafting_root",
        "name": "製作",
        "defaultactive": true,
        "level": 0,
        "maxLevel": 0,
        "effect": [],
        "icon": "ShopTitansAssets/Misc Icons/icon_global_selector_tab_craft.png",
        "prerequisites": [],
        "requiredPoints": 0,
        "position": {
            "x": 450,
            "y": 50
        }
    },
    {
        "id": "crafting_reset",
        "name": "重設",
        "defaultactive": true,
        "level": 0,
        "maxLevel": 0,
        "effect": [],
        "icon": "ShopTitansAssets/Misc Icons/icon_reset.svg",
        "prerequisites": [
            "crafting_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 600,
            "y": 50
        }
    },
    {
        "id": "crafting_1771688437270",
        "name": "無底箱",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_t1Capacity.png",
        "prerequisites": [
            "crafting_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 350,
            "y": 150
        }
    },
    {
        "id": "crafting_1771688477139",
        "name": "塔瑪斯同盟",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_t1Regen.png",
        "prerequisites": [
            "crafting_root"
        ],
        "requiredPoints": 0,
        "position": {
            "x": 550,
            "y": 150
        }
    },
    {
        "id": "crafting_1771688499006",
        "name": "環保",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_betterRecycle.png",
        "prerequisites": [
            "crafting_1771688437270",
            "crafting_1771688510882"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 300,
            "y": 300
        }
    },
    {
        "id": "crafting_1771688510882",
        "name": "大量生產",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_noQuality.png",
        "prerequisites": [
            "crafting_1771688499006",
            "crafting_1771688573786"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 300
        },
        "isSpecial": true
    },
    {
        "id": "crafting_1771688573786",
        "name": "指導",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_workerXpGain.png",
        "prerequisites": [
            "crafting_1771688477139",
            "crafting_1771688510882"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 600,
            "y": 300
        }
    },
    {
        "id": "crafting_1771688638985",
        "name": "倉庫美學",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_t2Capacity.png",
        "prerequisites": [
            "crafting_1771688499006",
            "crafting_1771688675830"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 280,
            "y": 450
        }
    },
    {
        "id": "crafting_1771688675830",
        "name": "推高機操作資格",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_inventoryIncrease.png",
        "prerequisites": [
            "crafting_1771688638985",
            "crafting_1771688732277"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 450
        }
    },
    {
        "id": "crafting_1771688732277",
        "name": "城市聯合",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_t2Regen.png",
        "prerequisites": [
            "crafting_1771688573786",
            "crafting_1771688675830"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 620,
            "y": 450
        }
    },
    {
        "id": "crafting_1771688755031",
        "name": "零浪費",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_resourceRefundChance.png",
        "prerequisites": [
            "crafting_1771688638985",
            "crafting_1771688773340"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 280,
            "y": 600
        }
    },
    {
        "id": "crafting_1771688773340",
        "name": "萊茵霍爾德的寵兒",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_favorBonus.png",
        "prerequisites": [
            "crafting_1771688638985",
            "crafting_1771688732277",
            "crafting_1771688755031",
            "crafting_1771688818912"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 600
        }
    },
    {
        "id": "crafting_1771688818912",
        "name": "製作者的小技巧",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_componentRefundChance.png",
        "prerequisites": [
            "crafting_1771688732277",
            "crafting_1771688773340"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 620,
            "y": 600
        }
    },
    {
        "id": "crafting_1771688855010",
        "name": "守夜之符",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_sigilFusion.png",
        "prerequisites": [
            "crafting_1771688755031"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 190,
            "y": 710
        }
    },
    {
        "id": "crafting_1771688887104",
        "name": "即興發揮",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_ignoreWorkerLevel.png",
        "isSpecial": true,
        "prerequisites": [
            "crafting_1771688818912"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 750,
            "y": 710
        }
    },
    {
        "id": "crafting_1771688965150",
        "name": "無暇工法",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_superiorFlawlessFusionCost.png",
        "prerequisites": [
            "crafting_1771688855010"
        ],
        "requiredPoints": 1,
        "position": {
            "x": 190,
            "y": 820
        }
    },
    {
        "id": "crafting_1771689011926",
        "name": "能量注入",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_fusionRush.png",
        "prerequisites": [
            "crafting_1771688965150"
        ],
        "requiredPoints": 2,
        "position": {
            "x": 190,
            "y": 1060
        },
        "isSpecial": true
    },
    {
        "id": "crafting_1771689051206",
        "name": "異國儲藏者",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_t3Capacity.png",
        "prerequisites": [
            "crafting_1771688755031",
            "crafting_1771688773340"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 365,
            "y": 820
        }
    },
    {
        "id": "crafting_1771689078877",
        "name": "神秘友誼",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_t3Regen.png",
        "prerequisites": [
            "crafting_1771688773340",
            "crafting_1771688818912"
        ],
        "requiredPoints": 5,
        "position": {
            "x": 535,
            "y": 820
        }
    },
    {
        "id": "crafting_1771689109837",
        "name": "赤裸精華",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_essenceCapacity.png",
        "prerequisites": [
            "crafting_1771689051206"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 280,
            "y": 940
        }
    },
    {
        "id": "crafting_1771689144522",
        "name": "特別狡黠",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 1,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_craftSlot.png",
        "prerequisites": [
            "crafting_1771689109837",
            "crafting_1771689254122"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 940
        },
        "isSpecial": true
    },
    {
        "id": "crafting_1771689254122",
        "name": "復甦死者",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 3,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_essenceRegen.png",
        "prerequisites": [
            "crafting_1771689078877"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 620,
            "y": 940
        }
    },
    {
        "id": "crafting_1771689283395",
        "name": "複製漏洞",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 5,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_multicraft.png",
        "prerequisites": [
            "crafting_1771689109837",
            "crafting_1771689254122"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 1180
        },
        "isSpecial": true
    },
    {
        "id": "crafting_1771692370171",
        "name": "傳奇工藝",
        "defaultactive": false,
        "level": 0,
        "maxLevel": 2,
        "effect": [],
        "icon": "ShopTitansAssets/Talent Tree/icon_skilltree_legendChance.png",
        "prerequisites": [
            "crafting_1771689283395"
        ],
        "requiredPoints": 3,
        "position": {
            "x": 450,
            "y": 1300
        },
        "isSpecial": true
    }
];
