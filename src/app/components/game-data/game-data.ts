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

@Component({
  selector: 'app-game-data',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ItemTypePipe, WorkerNamePipe, MaterialNamePipe, QualityNamePipe],
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

  // 建立英文名稱對應中文名稱的 Map
  equipmentTwNameMap = computed(() => {
    const map = new Map<string, string>();
    this.blueprints().forEach(bp => {
      if (bp.Name && bp.Name_tw) {
        map.set(bp.Name, bp.Name_tw);
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

  getComponentDisplayName(bp: Blueprint, index: 1 | 2): string {
    const componentName = index === 1 ? bp['Component'] : bp['Component2'];
    const componentQuality = index === 1 ? bp['ComponentQuality'] : bp['ComponentQuality2'];

    if (!componentName || componentName === '---') {
      return '';
    }

    if (componentQuality && componentQuality !== '---') {
      // 這是裝備，嘗試從 Map 中取得中文名稱
      const twName = this.equipmentTwNameMap().get(componentName);
      return twName ? twName : componentName;
    }

    // 是一般素材，回傳原名稱
    return componentName;
  }

  getItemImageUrl(uid: string): string {
    return `https://playshoptitans.com/_next/image?url=%2Fassets%2Fitems%2F${uid}.png&w=256&q=50`;
  }
}
