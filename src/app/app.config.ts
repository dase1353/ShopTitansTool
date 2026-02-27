import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import {
    LucideAngularModule, Menu, Github, Globe, Settings, Database, HelpCircle, Search, Layers, Filter, Loader2, Ghost,
    Coins, Clock, Swords, Shield, Heart, Wind, Zap, Hammer, LayoutGrid, List,
    FlaskConical, Gem, Crosshair, Wand, Scroll, Check, Shirt, Package, Share2, Save, Edit2, Store, Languages
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withHashLocation()),
        provideHttpClient(),
        provideTranslateService({
            loader: provideTranslateHttpLoader({
                prefix: './i18n/',
                suffix: '.json'
            }),
            fallbackLang: 'zh-TW',
            lang: 'zh-TW'
        }),
        importProvidersFrom(LucideAngularModule.pick({
            Menu, Github, Globe, Settings, Database, HelpCircle, Share2, Save, Edit2, Search, Layers, Filter, Loader2, Ghost,
            Coins, Clock, Swords, Shield, Heart, Wind, Zap, Hammer, LayoutGrid, List,
            FlaskConical, Gem, Crosshair, Wand, Scroll, Check, Shirt, Package, Store, Languages
        }))
    ]
};
