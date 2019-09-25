import { State, Action, StateContext } from "@ngxs/store";
import { take } from 'rxjs/operators';
import { AddressService } from '../services/address.service';
import { GetAddress, GetCoords, SetLoading } from './actions/form.actions';
import { SetAddress, ResetAddress } from './actions/address.actions';
import { FormAddress } from '../models/formaddress.model';
import { Address } from '../models/address.model';

@State<FormAddress>({
    name: 'formaddress',
    defaults: {
        input: '',
        loading: false,
        error: false
    }
})
export class FormState {
    constructor(private service: AddressService) {}

    @Action(GetAddress)
    getAddress(ctx: StateContext<FormAddress>, payload: GetAddress) {
        ctx.dispatch(new ResetAddress())
        ctx.patchState({loading: true, error: false})

        const observer = this.service.getAddress(payload.input).pipe(take(1))

        observer.subscribe(res => {
            ctx.dispatch(new GetCoords(res))
        }, err => {
            //ctx.dispatch()
            ctx.patchState({loading: false, error: true})
            console.error(err)
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

            ctx.patchState({loading: false})
            ctx.dispatch(new SetAddress(mapedCoords))
        }, err => {
            ctx.patchState({loading: false, error: true})
            console.error(err)
        })
    }

    @Action(SetLoading)
    setLoading(ctx: StateContext<FormAddress>, payload: SetLoading) {
        ctx.patchState({
            loading: payload.loading
        })
    }
}