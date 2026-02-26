import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, map } from 'rxjs';
import { Blueprint } from '../models/blueprint.model';

@Injectable({
  providedIn: 'root'
})
export class BlueprintService {
  private readonly blueprintUrl = 'ShopTitansAssets/blueprint/bp.json';

  private blueprintsCache: Blueprint[] | null = null;

  constructor(private http: HttpClient) { }

  getBlueprints(): Observable<Blueprint[]> {
    if (this.blueprintsCache) {
      return of(this.blueprintsCache);
    }
    return this.http.get<Blueprint[]>(this.blueprintUrl).pipe(
      tap(data => {
        console.log('Fetched blueprints:', data);
        this.blueprintsCache = data;
      }),
      catchError(error => {
        console.error('Error fetching blueprints:', error);
        return of([]);
      })
    );
  }
}
