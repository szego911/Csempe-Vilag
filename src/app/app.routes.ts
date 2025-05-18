import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/cart/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { TileListComponent } from './pages/tileList/tile-list.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TileListComponent,
  },
  {
    path: 'home',
    component: TileListComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profil',
    component: ProfilComponent,
  },
  {
    path: 'csempek',
    component: TileListComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];
