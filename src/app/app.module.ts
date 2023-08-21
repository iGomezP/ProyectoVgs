import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MainModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private primeConfig: PrimeNGConfig) {
    this.primeConfig.ripple = true;
  }
}
