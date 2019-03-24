import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UIService {
    private _drawerSTate = new BehaviorSubject<void>(null);

    get drawerSTate() {
        return this._drawerSTate.asObservable();
    }

    toggleDrawer() {
        this._drawerSTate.next(null);
    }

}
