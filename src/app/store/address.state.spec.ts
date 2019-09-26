import { async, TestBed } from '@angular/core/testing';
import { Store, NgxsModule } from '@ngxs/store';
import { AddressState } from './address.state';
import { SetAddress, ResetAddress } from './actions/address.actions';
import { Address } from '../models/address.model';

const mockState: Address = {
    cep: '78138-236',
    logradouro: 'Rua Colômbia',
    bairro: 'Marajoara',
    localidade: 'Várzea Grande',
    uf: 'MT',
    coordinates: {
        lat: null,
        lng: null
    }
}

describe('Address State', () => {
  let store: Store

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AddressState])],
    }).compileComponents()
    store = TestBed.get(Store)
  }))

  it('set the address', () => {
    store.dispatch(new SetAddress(mockState))

    store.selectOnce(state => state.address.cep).subscribe(cep => {
      expect(!!cep).toBe(true)
    })
  })

  it('resets the address state', () => {
    store.dispatch(new ResetAddress())

    store.selectOnce(state => state.address.cep).subscribe(cep => {
      expect(!!cep).not.toBe(true)
    })
  })
})
