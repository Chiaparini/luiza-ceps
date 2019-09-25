import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent {

  @Select(state => state.formaddress.loading) loading$: Observable<boolean>
  @Select(state => state.formaddress.error) error$: Observable<boolean>

  constructor() { }

}
