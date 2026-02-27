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
        this.translate.addLangs(['zh-TW', 'en-US']);
        this.translate.setDefaultLang('zh-TW');

        const savedLang = localStorage.getItem('appLang');
        if (savedLang) {
            this.translate.use(savedLang);
        } else {
            const browserLang = this.translate.getBrowserLang();
            this.translate.use(browserLang && browserLang.includes('zh') ? 'zh-TW' : 'en-US');
        }
    }
}
