import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
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
  ],
  template: `
    <mat-toolbar color="primary" class="shadow-md px-4 py-2" role="navigation">
      <button mat-raised-button color="accent" class="text-xl" routerLink="/">
        Csempe Világ
      </button>

      <span class="flex-1"></span>

      <div class="flex gap-4 items-center text-white text-lg">
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
  `,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);

  cartLabel = computed(() => `Kosár (${this.cartService.getCart().length})`);
}
