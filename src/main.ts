import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { cartReducer } from './app/store/cart.reducer';
import { CartEffects } from './app/store/cart.effects';

// PIEGE: provideHttpClient() et provideZoneChangeDetection() ne sont pas necessaires
// en Angular 21 (HttpClient fourni par defaut, et Angular 21 est zoneless par defaut).
bootstrapApplication(AppComponent, {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(),
        provideStore({ cart: cartReducer }),
        provideEffects([CartEffects]),
    ],
});
