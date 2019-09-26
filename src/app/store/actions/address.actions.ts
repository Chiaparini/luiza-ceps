import { Address } from '../../models/address.model';

export class SetAddress {
    static readonly type = '[Address] Set Address'
    constructor(public address: Address) {}
}

export class ResetAddress {
    static readonly type = '[Address] Reset Address'
}
