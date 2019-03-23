import { Component, Input } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';
import { Page } from 'tns-core-modules/ui/page/page';

declare var android: any;


@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id,
})
export class ActionBarComponent {
    @Input() title: string;

    constructor(private page: Page) {}

    onLoadedActionBar() {
        if(isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            if(backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor('#171717'),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                    );
            }
        }
    }
}
