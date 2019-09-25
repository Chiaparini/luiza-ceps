import { Address } from '../../models/address.model';

export class GetAddress {
    static readonly type = '[Form] Get Address'
    constructor(public input: string) {}
}

export class GetCoords {
    static readonly type = '[Form] Get Coords'
    constructor(public address: Address) {}
}