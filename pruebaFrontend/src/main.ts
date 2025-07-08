import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core'; 
import { PersonComponent } from './app/pages/person/person.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  
  providers: [
    provideRouter([{ path: '', component: PersonComponent }]), 

    provideApollo(() => ({
      uri: 'http://localhost:4000/graphql',
      cache: new InMemoryCache(), 
    })), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
