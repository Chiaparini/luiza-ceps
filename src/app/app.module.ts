import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AddressService } from './services/address.service';

import { FormContainerComponent } from './components/form-container/form-container.component';
import { FormComponent } from './components/form/form.component';
import { AddressState } from './store/address.state';
import { FormState } from './store/form.state';
import { MapComponent } from './components/map/map.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    FormComponent,
    MapComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    NgxMaskModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDnUn4i9tepMMtc2njQnZceUoj94ac2skA'
    }),

    // State
    NgxsModule.forRoot([
      AddressState,
      FormState
    ], {
      developmentMode: true
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
