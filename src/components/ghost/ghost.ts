import { Component} from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { GhostServiceProvider } from '../../providers/ghost-service/ghost-service';

/**
 * Generated class for the GhostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ghost',
  host: { '[class.isLoading]': 'isLoading' },
  templateUrl: 'ghost.html'
})
export class GhostComponent {


  public isLoading: boolean = true;
  private isLoadingSubscription: Subscription;

  private data: Object = {};

  public constructor(private _ghostSrv: GhostServiceProvider) {
    this.isLoadingSubscription = this._ghostSrv.isLoading.subscribe(data => this._updateLoading(data));
  }

  public ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
}

private _updateLoading(data) {
    if (!data) return
    this._setData(data)._process();
}

private _setData(data: Object) {
    this.data = data;
    return this;
}

private _process() {
    return this._setLoading();
}

private _setLoading() {
    this.isLoading = this.data['isLoading']
}

}
