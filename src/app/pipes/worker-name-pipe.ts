import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workerName',
})
export class WorkerNamePipe implements PipeTransform {
  private readonly workerMap: Record<string, string> = {
    Blacksmith: '鐵匠',
    Carpenter: '木匠',
    Cook: '廚師',
    Herbalist: '草藥師',
    'Moon Dragon': '月龍',
    'Sun Dragon': '日龍',
    Scholar: '學者',
    Engineer: '工程師',
    Bard: '吟遊詩人',
    Veteran: '老兵',
    'Storm Elemental': '風暴元素',
    Wizard: '巫師',
    Tailor: '裁縫師',
    Summoner: '召喚師',
    Jeweler: '珠寶匠',
    Priestess: '女牧師',
    Baker: '麵包師',
    Master: '大師',
  };

  transform(value: string | undefined | null): string {
    if (!value) return '';
    return this.workerMap[value] || value;
  }
}
