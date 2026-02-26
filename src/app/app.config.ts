import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import {
    LucideAngularModule, Menu, Github, Globe, Settings, Database, HelpCircle, Search, Layers, Filter, Loader2, Ghost,
    Coins, Clock, Swords, Shield, Heart, Wind, Zap, Hammer, LayoutGrid, List,
    FlaskConical, Gem, Crosshair, Wand, Scroll, Shirt, Package, Share2, Save, Edit2
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withHashLocation()),
        provideHttpClient(),
        importProvidersFrom(LucideAngularModule.pick({
            Menu, Github, Globe, Settings, Database, HelpCircle, Share2, Save, Edit2, Search, Layers, Filter, Loader2, Ghost,
            Coins, Clock, Swords, Shield, Heart, Wind, Zap, Hammer, LayoutGrid, List,
            FlaskConical, Gem, Crosshair, Wand, Scroll, Shirt, Package
        }))
    ]
};
