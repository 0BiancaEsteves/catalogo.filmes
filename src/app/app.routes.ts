import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';

export const routes: Routes = [
  // Rota padrão para o login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // Rota para o dashboard
  { path: 'dashboard', component: DashboardComponent },
];