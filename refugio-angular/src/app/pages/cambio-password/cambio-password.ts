import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambio-password',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cambio-password.html',
  styleUrl: './cambio-password.css',
})
export class CambioPassword {
  verActual: boolean = false;
  verNueva: boolean = false;

  toggleVerActual() {
    this.verActual = !this.verActual;
  }

  toggleVerNueva() {
    this.verNueva = !this.verNueva;
  }
}
