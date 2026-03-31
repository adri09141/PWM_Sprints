import { Component, signal, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Footer} from './components/footer/footer';
import {Header} from './components/header/header';
import {Inicio} from './pages/inicio/inicio';
import {Catalogo} from './pages/catalogo/catalogo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Header, Inicio, Catalogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('refugio-angular');
}
