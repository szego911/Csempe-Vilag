import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  template: `
    <mat-toolbar color="primary" class="shadow-md px-4 py-2" role="navigation">
      <!-- Logo / címsor -->
      <button
        mat-button
        color="accent"
        class="text-xl font-bold"
        routerLink="/"
      >
        Csempe Világ
      </button>

      <!-- Mobil hamburger ikon -->
      <button
        *ngIf="isMobile"
        mat-icon-button
        class="ml-auto md:hidden text-white"
        (click)="menuOpen = !menuOpen"
      >
        <mat-icon>{{ menuOpen ? 'close' : 'menu' }}</mat-icon>
      </button>

      <!-- Asztali menü -->
      <div
        class="hidden sm:flex gap-4 items-center text-white text-base ml-auto"
      >
        <button mat-button routerLink="/home">Főoldal</button>
        <button mat-button routerLink="/csempek">Csempék</button>
        <button mat-button routerLink="/login">Bejelentkezés</button>
        <button mat-button routerLink="/profil">Profil</button>
        <button mat-button routerLink="/admin">Admin</button>
        <button mat-stroked-button color="accent" routerLink="/cart">
          {{ cartLabel() }}
        </button>
      </div>
    </mat-toolbar>

    <!-- Mobil menü lenyílva -->
    <div
      class="sm:hidden flex flex-col gap-2 bg-primary text-white px-4 py-3 transition-all duration-300"
      *ngIf="menuOpen"
    >
      <button mat-button routerLink="/home">Főoldal</button>
      <button mat-button routerLink="/csempek">Csempék</button>
      <button mat-button routerLink="/login">Bejelentkezés</button>
      <button mat-button routerLink="/profil">Profil</button>
      <button mat-button routerLink="/admin">Admin</button>
      <button mat-stroked-button color="accent" routerLink="/cart">
        {{ cartLabel() }}
      </button>
    </div>
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);

  cartLabel = computed(() => `Kosár (${this.cartService.getCart().length})`);
  menuOpen = false;

  isMobile = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 640; // Tailwind sm = 640px
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 640;
    });
  }
}
