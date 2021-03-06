import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AddressService } from './services/address.service';

import { AddressState } from './store/address.state';
import { FormState } from './store/form.state';

import { FormContainerComponent } from './components/form-container/form-container.component';
import { FormComponent } from './components/form-container/form/form.component';
import { MapComponent } from './components/map-card/map/map.component';
import { LoadingComponent } from './components/map-card/loading/loading.component';
import { MapCardComponent } from './components/map-card/map-card.component';
import { ErrorComponent } from './components/form-container/error/error.component';
import { ColorBarComponent } from './components/color-bar/color-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FormContainerComponent,
    FormComponent,
    MapComponent,
    LoadingComponent,
    MapCardComponent,
    ErrorComponent,
    ColorBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKey
    }),

    // State
    NgxsModule.forRoot([
      AddressState,
      FormState
    ], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [
    AddressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
