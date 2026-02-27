import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workerName',
})
export class WorkerNamePipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return '';
    const key = value.toUpperCase().replace(/\s+/g, '_');
    return `WORKER.${key}`;
  }
}
