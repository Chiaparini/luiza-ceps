import { State, Action, StateContext } from "@ngxs/store";
import { take } from 'rxjs/operators';
import { AddressService } from '../services/address.service';
import { GetAddress, GetCoords } from './actions/form.actions';
import { SetAddress } from './actions/address.actions';
import { FormAddress } from '../models/formaddress.model';
import { Address } from '../models/address.model';

@State<FormAddress>({
    name: 'formaddress',
    defaults: {
        input: '',
        loading: false
    }
})
export class FormState {
    constructor(private service: AddressService) {}

    @Action(GetAddress)
    getAddress(ctx: StateContext<FormAddress>, payload: GetAddress) {
        const observer = this.service.getAddress(payload.input).pipe(take(1))

        observer.subscribe(res => {
            ctx.dispatch(new GetCoords(res))
        })
    }

    @Action(GetCoords)
    getCoords(ctx: StateContext<FormAddress>, payload: GetCoords) {
        const observer = this.service.getCoordinates(payload.address).pipe(take(1))

        observer.subscribe((res: any) => {
            const [firstResult, ] = res.results,
            mapedCoords: Address = {
                ...payload.address,
                coordinates: firstResult.geometry.location
            }

            ctx.dispatch(new SetAddress(mapedCoords))
        })
    }
}