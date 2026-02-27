import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ItemTypePipe } from '../../pipes/item-type.pipe';
import { MaterialNamePipe } from '../../pipes/material-name.pipe';
import { QualityNamePipe } from '../../pipes/quality-name.pipe';
import { WorkerNamePipe } from '../../pipes/worker-name-pipe';
import { Blueprint } from '../../models/blueprint.model';

import { ItemNamePipe } from '../../pipes/item-name.pipe';

@Component({
    selector: 'app-blueprint-card',
    standalone: true,
    imports: [
        CommonModule,
        LucideAngularModule,
        TranslateModule,
        ItemTypePipe,
        WorkerNamePipe,
        MaterialNamePipe,
        QualityNamePipe,
        ItemNamePipe
    ],
    templateUrl: './blueprint-card.component.html',

    styleUrl: "./blueprint-card.component.css"
})
export class BlueprintCardComponent {
    @Input({ required: true }) bp!: Blueprint;
    @Input() equipmentNameMap!: Map<string, { en: string, tw: string, fr: string, ru: string }>;

    getComponentDisplayName(index: 1 | 2): any {
        const componentName = index === 1 ? this.bp['Component'] : this.bp['Component2'];
        const componentQuality = index === 1 ? this.bp['ComponentQuality'] : this.bp['ComponentQuality2'];

        if (!componentName || componentName === '---') {
            return '';
        }

        if (componentQuality && componentQuality !== '---') {
            const names = this.equipmentNameMap?.get(componentName);
            if (names) {
                return {
                    Name: componentName,
                    Name_en: names.en,
                    Name_tw: names.tw,
                    Name_fr: names.fr,
                    Name_ru: names.ru
                };
            }
            return { Name: componentName };
        }

        return componentName;
    }

    getItemImageUrl(uid: string): string {
        return `https://playshoptitans.com/_next/image?url=%2Fassets%2Fitems%2F${uid}.png&w=256&q=50`;
    }

    getResourceImageUrl(resourceName: string): string {
        return `ShopTitansAssets/Resources/icon_global_resource_${resourceName.toLowerCase()}.png`;
    }

    getComponentImageUrl(componentName: string): string {
        const safeName = componentName.toLowerCase().replace(/\s+/g, '');
        return `ShopTitansAssets/Components/${safeName}.png`;
    }

    getQualityImageUrl(qualityName: string): string {
        return `ShopTitansAssets/Quality Indicators/icon_global_quality_${qualityName.toLowerCase()}.png`;
    }

    isEquipment(componentQuality: string | null | undefined): boolean {
        return !!componentQuality && componentQuality !== '---';
    }
}
