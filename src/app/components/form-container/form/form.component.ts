import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetAddress } from '../../../store/actions/form.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  cep: string
  error: boolean = false

  addressForm: FormGroup = new FormGroup({
    cep: new FormControl(this.cep, [
      Validators.required
    ])
  })

  constructor(
    private store: Store
  ) { }

  onSubmit(): void {
    if (this.addressForm.controls.cep.errors) { 
      this.error = true
      throw new Error('CEP requerido')
    }

    this.clearError()
    this.store.dispatch(new GetAddress(this.addressForm.value.cep))
  }

  clearError(): void {
    this.error = false;
  }

}
