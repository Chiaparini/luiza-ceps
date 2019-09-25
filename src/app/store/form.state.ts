import { State, Action, StateContext } from "@ngxs/store";
import { take, map } from 'rxjs/operators';
import { AddressService } from '../services/address.service';
import { GetAddress, GetCoords } from './actions/form.actions';
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

        this.service.getAddress(payload.input).pipe(
            map((res: any) => {
                if (res.erro) throw new Error('Endereço não encontrado')
                return res
            }),
            take(1)
        ).subscribe((res: any) => {
            ctx.dispatch(new GetCoords(res))
        }, err => {
            ctx.patchState({loading: false, error: true})
        })
    }

    @Action(GetCoords)
    getCoords(ctx: StateContext<FormAddress>, payload: GetCoords) {
        this.service.getCoordinates(payload.address).pipe(
            map((res: any) => {
                if (!res.results.length) throw new Error('Zero results')
                return res
            }),
            take(1)
        ).subscribe((res: any) => {
            const [firstResult, ] = res.results,
            mapedCoords: Address = {
                ...payload.address,
                coordinates: firstResult.geometry.location
            }

            ctx.patchState({loading: false})
            ctx.dispatch(new SetAddress(mapedCoords))
        }, err => {
            ctx.patchState({loading: false, error: true})
        })
    }
}