import {booleanAttribute, Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule, NgModel} from '@angular/forms';
import { DatabaseService } from '../../services/database';
@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-cuenta.html',
  styleUrl: './crear-cuenta.css',
})
export class CrearCuenta {
  menorEdad: boolean = true;
  verContrasena: boolean = false;
  constructor(private db: DatabaseService) {} // Inyectamos tu servicio
  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }
  enviarDatos(fecha: NgModel) {
    if (!fecha.value) return;
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha.value);
    const edadMinima = new Date();

    edadMinima.setFullYear(hoy.getFullYear() - 18);

    if (fechaNacimiento < edadMinima) {
      this.menorEdad = false;
    } else {
      this.menorEdad = true;
    }

  }
}
