import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ResetAddress } from '../../store/actions/address.actions';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent {

  constructor(private store: Store) { }

  resetAddress(): void {
    this.store.dispatch(new ResetAddress())
  }

}
