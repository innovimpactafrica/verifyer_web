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
    },

    {
        path: 'signup',
        loadComponent: () => import('./components/signup/signup.component').then(m => m.SignupComponent)
    },


    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },

    {
        path: 'mes-demandes',
        loadComponent: () => import('./components/client/mes-demandes/mes-demandes.component').then(m => m.MesDemandesComponent)
    },

    {
        path: 'nouvelle-demande',
        loadComponent: () => import('./components/client/nouvelle-demande/nouvelle-demande.component').then(m => m.NouvelleDemandeComponent)
    }
];
