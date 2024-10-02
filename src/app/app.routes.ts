import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitiativeComponent } from './components/dashboard/pages/initiative/initiative.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { 
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/pages/initiative/initiative.component').then(m => m.InitiativeComponent)
    },
    { 
        path: 'create-initiative',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/pages/create-initiative/create-initiative.component').then(m => m.CreateInitiativeComponent)
    },
    { 
        path: 'settings',
        canActivate: [AuthGuard],
        loadComponent: () => import('./components/dashboard/pages/settings/settings.component').then(m => m.SettingsComponent)
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
