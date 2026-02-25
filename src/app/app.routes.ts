import { Routes } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { TalentContainerComponent } from './components/talent-container/talent-container.component';
import { SettingsComponent } from './components/settings/settings.component';
import { GameData } from './components/game-data/game-data';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            { path: '', redirectTo: 'talent', pathMatch: 'full' },
            { path: 'talent', component: TalentContainerComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'game-data', component: GameData }
        ]
    }
];
