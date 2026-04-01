import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import {SobreNosotros} from './pages/sobre-nosotros/sobre-nosotros';
import {FinalesFelices} from './pages/finales-felices/finales-felices';
import {CrearCuenta} from './pages/crear-cuenta/crear-cuenta';
import {IniciarSesion} from './pages/iniciar-sesion/iniciar-sesion';
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'catalogo', component: Catalogo },
  { path: 'finalesFelices', component: FinalesFelices },
  {path: 'sobreNosotros', component: SobreNosotros},
  {path: 'crearCuenta', component: CrearCuenta},
  {path: 'IniciarSesion', component: IniciarSesion},

];
