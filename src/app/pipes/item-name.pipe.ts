import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Blueprint } from '../models/blueprint.model';

@Pipe({
    name: 'itemName',
    standalone: true,
    pure: false
})
export class ItemNamePipe implements PipeTransform {
    constructor(private translate: TranslateService) { }

    transform(bp: Blueprint | any): string {
        if (!bp) return '';

        const currentLang = this.translate.getCurrentLang() || this.translate.getFallbackLang();

        if (currentLang === 'zh-TW') {
            return bp.Name_tw || bp.Name;
        }

        if (currentLang === 'fr') {
            return bp.Name_fr || bp.Name_en || bp.Name;
        }

        if (currentLang === 'ru') {
            return bp.Name_ru || bp.Name_en || bp.Name;
        }

        return bp.Name_en || bp.Name;
    }
}
