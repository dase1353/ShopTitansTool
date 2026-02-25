import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule, Menu, Github, Globe, Settings, Database, HelpCircle, Share2, Save, Edit2 } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZonelessChangeDetection(),
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes, withHashLocation()),
        importProvidersFrom(LucideAngularModule.pick({ Menu, Github, Globe, Settings, Database, HelpCircle, Share2, Save, Edit2 }))
    ]
};
