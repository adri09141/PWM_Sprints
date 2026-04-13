import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser$ = this.authService.currentUser$;

  isMenuOpen = signal(false);
  viewportWidth = signal<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  isMobile = computed(() => this.viewportWidth() <= 768);

  constructor() {
    // Close the mobile menu on any navigation, matching legacy behavior.
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isMenuOpen.set(false);
        }
      });
  }

  onResize(event: UIEvent): void {
    const width = (event.target as Window).innerWidth;
    this.viewportWidth.set(width);
    if (width > 768) {
      this.isMenuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  get burgerAriaExpanded(): string {
    return String(this.isMenuOpen());
  }

  get burgerAriaLabel(): string {
    return this.isMenuOpen() ? 'Cerrar men\u00fa' : 'Abrir men\u00fa';
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/IniciarSesion']);
  }
}
