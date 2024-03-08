// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';

// providers
import { addAuthorizationHeaderInterceptorProvider } from './core/providers/add-authorization-header-interceptor.provider';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSnackBarModule],
  providers: [addAuthorizationHeaderInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
