import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Address } from '../../../models/address.model';
import { AddressState } from '../../../store/address.state';
import { ResetAddress } from '../../../store/actions/address.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Select(AddressState) address$: Observable<Address>
  address: Address
  
  constructor(private store: Store) {
    this.address$.subscribe(res => this.address = res)
  }

  resetAddress(): void {
    this.store.dispatch(new ResetAddress())
  }

}
