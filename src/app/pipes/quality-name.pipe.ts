import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'qualityName',
    standalone: true
})
export class QualityNamePipe implements PipeTransform {
    transform(value: string | undefined | null): string {
        if (!value) return '';
        const key = value.toUpperCase().replace(/\s+/g, '_');
        return `QUALITY.${key}`;
    }
}
