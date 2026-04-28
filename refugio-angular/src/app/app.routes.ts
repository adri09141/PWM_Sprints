import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Catalogo } from './pages/catalogo/catalogo';
import {SobreNosotros} from './pages/sobre-nosotros/sobre-nosotros';
import {FinalesFelices} from './pages/finales-felices/finales-felices';
import {CrearCuenta} from './pages/crear-cuenta/crear-cuenta';
import {IniciarSesion} from './pages/iniciar-sesion/iniciar-sesion';
import {AnadirResena} from './pages/anadir-resena/anadir-resena';
import { FichaAnimalPage } from './pages/ficha-animal/ficha-animal';
import { Adopcion } from './pages/adopcion/adopcion';
import { Perfil } from './pages/perfil/perfil';
import {Adoptados} from './pages/adoptados/adoptados';
import { CambioPassword } from "./pages/cambio-password/cambio-password";

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'catalogo', component: Catalogo },
  { path: 'catalogo/:id', component: FichaAnimalPage },
  { path: 'adopcion/:id', component: Adopcion },
  { path: 'finalesFelices', component: FinalesFelices },
  { path: 'sobreNosotros', component: SobreNosotros },
  { path: 'crearCuenta', component: CrearCuenta },
  { path: 'IniciarSesion', component: IniciarSesion },
  { path: 'AnadirResena', component: AnadirResena },
  { path: 'perfil', component: Perfil },
  { path: 'adoptados', component: Adoptados },
  { path: 'cambioPassword', component: CambioPassword },
];
