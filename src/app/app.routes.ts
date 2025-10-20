import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'portail', pathMatch: 'full' },

    {
        path: 'portail',
        loadComponent: () => import('./components/portail/portail.component').then(m => m.PortailComponent)
    },

    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    }
];
