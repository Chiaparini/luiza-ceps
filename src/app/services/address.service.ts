import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address.model';

@Injectable()
export class AddressService {

    private api = 'https://viacep.com.br/ws'
    private mapsApi = 'https://maps.googleapis.com/maps/api/geocode/json'

    constructor(
        private httpClient: HttpClient,
    ) { }

    getAddress(cep: string): Observable<Address> {
        return this.httpClient
            .jsonp<Address>(`${this.api}/${cep}/json/?callback=JSONP_CALLBACK`, 'JSONP_CALLBACK')
    }

    getCoordinates(address: Address): Observable<any> {
        return this.httpClient
            .get(`${this.mapsApi}?address=${address.cep} ${address.localidade} ${address.logradouro}&key=${environment.mapsKey}`)
    }
}
