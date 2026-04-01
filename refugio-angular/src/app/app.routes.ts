import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'catalogo', component: Catalogo }
];
