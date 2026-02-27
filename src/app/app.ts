import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: '<router-outlet />',
    styles: ['']
})
export class App {
    private translate = inject(TranslateService);

    constructor() {
        this.translate.addLangs(['zh-TW', 'en-US', 'fr', 'ru']);
        this.translate.setFallbackLang('zh-TW');

        const savedLang = localStorage.getItem('appLang');
        if (savedLang) {
            this.translate.use(savedLang);
        } else {
            this.translate.use('zh-TW');
        }
    }
}
