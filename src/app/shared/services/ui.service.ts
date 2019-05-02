import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UIService {
    private _drawerSTate = new BehaviorSubject<void>(null);
    private _rootVCRef: ViewContainerRef;

    get drawerSTate() {
        return this._drawerSTate.asObservable();
    }

    toggleDrawer() {
        this._drawerSTate.next(null);
    }

    setRootVCRef(vcRef: ViewContainerRef) {
        this._rootVCRef = vcRef;
    }

    getRootVCRef() {
        return this._rootVCRef;
    }

}
