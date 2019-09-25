import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetAddress } from '../../store/actions/form.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  addressForm: FormGroup = new FormGroup({
    cep: new FormControl('')
  })

  constructor(
    private store: Store
  ) { }

  onSubmit(): void {
    this.store.dispatch(new GetAddress(this.addressForm.value.cep))
  }

  ngOnInit() {
  }

}
