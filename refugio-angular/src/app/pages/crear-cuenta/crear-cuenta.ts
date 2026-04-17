import {booleanAttribute, Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule, NgModel, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
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
  constructor(private db: DatabaseService, private router: Router) {} // Inyectamos tu servicio
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
  crearCuenta(formulario: NgForm)
  {
    const datos = formulario.value;
    datos.numeroAdopciones = 0;
    this.db.insertar("usuarios", datos) // Te lo he cambiado a "usuarios" para que no haya mil carpetas raras
      .then(() => {
        // 💬 AVISO: Si ha ido bien, celebramos y limpiamos
        alert("🎉 ¡Bienvenido a la familia! Tu cuenta ha sido creada.");
        formulario.resetForm(); // Esto vacía todos los inputs automáticamente
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Por si acaso se cae internet o falla algo
        console.error("Error al crear cuenta:", error);
        alert("❌ Vaya, hubo un problema al conectar con el servidor.");
      });

  }
}
