import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {DatabaseService} from '../../services/database';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor(private db: DatabaseService) {
  }
  user: any = null;

  ngOnInit() {
    this.authService.currentUser$.subscribe(currentUser => {
      if (currentUser) {
         this.user = { ...currentUser };
      } else {
         this.router.navigate(['/IniciarSesion']);
      }
    });
  }

  logout() {
    const usuario = this.authService.getCurrentUser();
    if(usuario && usuario.id) {
      this.authService.eliminarCuentaPropia();
      this.router.navigate(['/IniciarSesion']);
    }
  }
}
