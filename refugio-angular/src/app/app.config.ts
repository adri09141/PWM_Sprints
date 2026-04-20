import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    // Inicializamos Firebase con las credenciales del proyecto
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    // Activamos Firestore para los datos de perfil de usuario
    provideFirestore(() => getFirestore()),
    // Activamos Firebase Authentication para login/registro seguro
    provideAuth(() => getAuth()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    )
  ]
};
