import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'qualityName',
    standalone: true
})
export class QualityNamePipe implements PipeTransform {
    private readonly qualityMap: Record<string, string> = {
        'Normal': '普通',
        'Superior': '優良',
        'Flawless': '無暇',
        'Epic': '史詩',
        'Legendary': '傳奇',
    };

    transform(value: string | undefined | null): string {
        if (!value) return '';
        return this.qualityMap[value] || value;
    }
}
