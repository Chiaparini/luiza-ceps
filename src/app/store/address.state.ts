import { State, Action, StateContext } from '@ngxs/store';
import { Address } from '../models/address.model';
import { SetAddress, ResetAddress } from './actions/address.actions';

const defaults: Address = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    unidade: '',
    ibge: null,
    gia: null,
    coordinates: null
}

@State<Address>({
    name: 'address',
    defaults
})
export class AddressState {
    @Action(SetAddress)
    setAddress(ctx: StateContext<Address>, payload: SetAddress) {
        ctx.patchState({
            ...payload.address
        })
    }

    @Action(ResetAddress)
    resetAddress(ctx: StateContext<Address>) {
        ctx.setState(defaults)
    }
}
