import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemType',
    standalone: true
})
export class ItemTypePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        const key = value.toUpperCase().replace(/\s+/g, '_');
        return `ITEM_TYPE.${key}`;
    }
}
