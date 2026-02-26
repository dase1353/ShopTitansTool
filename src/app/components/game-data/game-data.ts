import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlueprintService } from '../../services/blueprint.service';
import { Blueprint } from '../../models/blueprint.model';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Grid3X3, List } from 'lucide-angular';

@Component({
  selector: 'app-game-data',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    { provide: 'LucideIcons', useValue: { Grid3X3, List } }
  ],
  templateUrl: './game-data.html',
  styleUrl: './game-data.css',
})
export class GameData implements OnInit {
  private blueprintService = inject(BlueprintService);

  blueprints = signal<Blueprint[]>([]);
  isLoading = signal<boolean>(true);

  // Filters
  searchQuery = signal<string>('');
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
        (bp.Name && bp.Name.toLowerCase().includes(q))
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
    this.blueprintService.getBlueprints().subscribe(data => {
      this.blueprints.set(data);
      this.isLoading.set(false);
    });
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
}
