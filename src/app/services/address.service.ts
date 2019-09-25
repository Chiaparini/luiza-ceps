import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable()
export class AddressService {
    
    private api: string = "https://viacep.com.br/ws"
    private mapsApi: string = "https://maps.googleapis.com/maps/api/geocode/json"
    
    constructor(
        private httpClient: HttpClient,
    ) { }

    getAddress(cep: string): Observable<Address> {
        return this.httpClient
            .jsonp<Address>(`${this.api}/${cep}/json/?callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
    }

    getCoordinates(address: Address) {
        return this.httpClient
            .get(`${this.mapsApi}?address=${address.cep} ${address.localidade} ${address.logradouro}&key=AIzaSyDnUn4i9tepMMtc2njQnZceUoj94ac2skA`)
    }
}