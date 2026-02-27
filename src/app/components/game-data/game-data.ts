import { Component, OnInit, computed, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlueprintService } from '../../services/blueprint.service';
import { Blueprint } from '../../models/blueprint.model';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Grid3X3, List } from 'lucide-angular';
import { ItemTypePipe } from '../../pipes/item-type.pipe';
import { WorkerNamePipe } from '../../pipes/worker-name-pipe';
import { MaterialNamePipe } from '../../pipes/material-name.pipe';
import { QualityNamePipe } from '../../pipes/quality-name.pipe';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { BlueprintCardComponent } from '../blueprint-card/blueprint-card.component';
import { ItemNamePipe } from '../../pipes/item-name.pipe';

@Component({
  selector: 'app-game-data',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ItemTypePipe, WorkerNamePipe, MaterialNamePipe, QualityNamePipe, TranslateModule, BlueprintCardComponent, ItemNamePipe],
  providers: [
    { provide: 'LucideIcons', useValue: { Grid3X3, List } }
  ],
  templateUrl: './game-data.html',
  styleUrl: './game-data.css',
})
export class GameData implements OnInit {
  private blueprintService = inject(BlueprintService);
  private destroyRef = inject(DestroyRef);

  blueprints = signal<Blueprint[]>([]);
  isLoading = signal<boolean>(true);

  // Filters
  searchInput = signal<string>('');
  searchQuery = signal<string>('');
  private searchSubject = new Subject<string>();
  selectedTier = signal<number | null>(null);
  selectedType = signal<string | null>(null);
  viewMode = signal<'grid' | 'list'>('grid');

  // Options for dropdowns
  availableTiers = computed(() => {
    const tiers = new Set(this.blueprints().map(bp => bp.Tier));
    return Array.from(tiers).sort((a, b) => a - b);
  });

  availableTypes = computed(() => {
    const types = new Set(this.blueprints().map(bp => bp.Type));
    return Array.from(types).sort();
  });

  // 建立英文名稱對應多國語言名稱的 Map (key: Name, value: {en, tw})
  equipmentNameMap = computed(() => {
    const map = new Map<string, { en: string, tw: string, fr: string, ru: string }>();
    this.blueprints().forEach(bp => {
      if (bp.Name) {
        map.set(bp.Name, {
          en: bp.Name_en || bp.Name,
          tw: bp.Name_tw || bp.Name,
          fr: bp.Name_fr || bp.Name_en || bp.Name,
          ru: bp.Name_ru || bp.Name_en || bp.Name
        });
      }
    });
    return map;
  });

  // Filtered array
  filteredBlueprints = computed(() => {
    let result = this.blueprints();

    // 如果沒有任何過濾條件，不要顯示任何資料（避免一開始載入太多卡頓且符合您的需求）
    const q = this.searchQuery()?.trim().toLowerCase();
    const t = this.selectedTier();
    const type = this.selectedType();

    if (!q && (t === null || t === undefined) && (type === null || type === 'All')) {
      return []; // 不要顯示任何道具
    }

    if (q) {
      result = result.filter(bp =>
        (bp.Name && bp.Name.toLowerCase().includes(q)) ||
        (bp.Name_tw && bp.Name_tw.toLowerCase().includes(q))
      );
    }

    if (t !== null && t !== undefined) {
      result = result.filter(bp => bp.Tier == t);
    }

    if (type && type !== 'All') {
      result = result.filter(bp => bp.Type === type);
    }

    return result;
  });

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(query => {
      this.searchQuery.set(query);
    });

    this.blueprintService.getBlueprints().subscribe(data => {
      this.blueprints.set(data);
      this.isLoading.set(false);
    });
  }

  onSearchChange(query: string) {
    this.searchInput.set(query);
    this.searchSubject.next(query);
  }

  getTypeIcon(type: string): string {
    // Basic mapping, can be expanded if needed
    const typeLower = type.toLowerCase();
    if (typeLower.includes('sword') || typeLower.includes('dagger')) return 'swords';
    if (typeLower.includes('armor') || typeLower.includes('plate')) return 'shield';
    if (typeLower.includes('potion')) return 'flask-conical';
    if (typeLower.includes('ring') || typeLower.includes('amulet')) return 'gem';
    if (typeLower.includes('bow') || typeLower.includes('gun')) return 'crosshair';
    if (typeLower.includes('staff') || typeLower.includes('wand')) return 'wand';
    if (typeLower.includes('herb') || typeLower.includes('scroll')) return 'scroll';
    if (typeLower.includes('clothes') || typeLower.includes('shoes')) return 'shirt';
    return 'package'; // fallback icon
  }

  getComponentDisplayName(bp: Blueprint, index: 1 | 2): any {
    const componentName = index === 1 ? bp['Component'] : bp['Component2'];
    const componentQuality = index === 1 ? bp['ComponentQuality'] : bp['ComponentQuality2'];

    if (!componentName || componentName === '---') {
      return '';
    }

    if (componentQuality && componentQuality !== '---') {
      // 這是裝備，回傳一個假的 bp 物件給 itemName pipe 使用
      const names = this.equipmentNameMap().get(componentName);
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

    // 是一般素材，回傳原名稱字串給 materialName pipe 使用
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
    // If it has a quality requirement that is not '---', it's equipment.
    // Base game assets are treated as materials (no quality).
    return !!componentQuality && componentQuality !== '---';
  }
}
