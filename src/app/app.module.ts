import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


import { AddressService } from './services/address.service';

import { FormContainerComponent } from './components/form-container/form-container.component';
import { FormComponent } from './components/form-container/form/form.component';
import { AddressState } from './store/address.state';
import { FormState } from './store/form.state';
import { MapComponent } from './components/map-card/map/map.component';
import { LoadingComponent } from './components/map-card/loading/loading.component';
import { MapCardComponent } from './components/map-card/map-card.component';
import { ErrorComponent } from './components/form-container/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    FormComponent,
    MapComponent,
    LoadingComponent,
    MapCardComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    NgxMaskModule.forRoot(),
    NgxSkeletonLoaderModule,

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
