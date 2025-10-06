import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { SobreFilmesComponent } from './componentes/sobre-filmes/sobre-filmes.component';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', component: DashboardComponent },
  
  // Rota unificada para filmes, séries e animes
  { path: 'sobre-filmes/:type/:id', component: SobreFilmesComponent },
  
  { path: 'home', component: HomeComponent }
];
