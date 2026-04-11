import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adopcion',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './adopcion.html',
  styleUrl: './adopcion.css',
})
export class Adopcion {
  constructor(private router: Router) {}
  botonPulsado: boolean = false;
  home(form: NgForm) {
    if(form.valid) {
      this.router.navigate(['/']);
      alert("Solicitud enviada, pendiente de validar");
    } else {
      console.log("El formulario no es válido aún");
    }
  }

  protected readonly name = name;
}
