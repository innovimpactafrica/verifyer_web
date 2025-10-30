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
        loadComponent: () => import('./components/client/client-dashboard/client-dashboard.component').then(m => m.DashboardComponent)
    },

    {
        path: 'mes-demandes',
        loadComponent: () => import('./components/client/demandes/mes-demandes/mes-demandes.component').then(m => m.MesDemandesComponent)
    },

    {
        path: 'nouvelle-demande',
        loadComponent: () => import('./components/client/demandes/nouvelle-demande/nouvelle-demande.component').then(m => m.NouvelleDemandeComponent)
    },

    {
        path: 'validation-demande/:id',
        loadComponent: () => import('./components/client/demandes/validation-demande/validation-demande.component').then(m => m.ValidationDemandeComponent)
    },

    {
        path: 'detail-paiement/:id',
        loadComponent: () => import('./components/client/demandes/detail-paiement/detail-paiement.component').then(m => m.DetailPaiementComponent)
    },
    {
        path: 'mes-certifications',
        loadComponent: () => import('./components/client/certifications/mes-certifications/mes-certifications.component').then(m => m.MesCertificationsComponent)
    },
    {
        path: 'paiements',
        loadComponent: () => import('./components/client/paiements/paiements.component').then(m => m.PaiementsComponent)
    },
    {
        path: 'admin/dashboard',
        loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
        path: 'detail-certification/:id',
        loadComponent: () => import('./components/client/certifications/detail-certification/detail-certification.component').then(m => m.DetailCertificationComponent)
    },
    {
        path: 'admin/utilisateurs',
        loadComponent: () => import('./components/admin/utilisateurs/utilisateurs.component').then(m => m.UtilisateursComponent)
    },
    {
        path: 'admin/missions',
        loadComponent: () => import('./components/admin/missions/missions.component').then(m => m.MissionsComponent)
    },
    {
        path: 'admin/rapports',
        loadComponent: () => import('./components/admin/rapports/rapports.component').then(m => m.RapportsComponent)
    },
    {
        path: 'admin/renouvellement',
        loadComponent: () => import('./components/admin/renouvellement/renouvellement.component').then(m => m.RenouvellementComponent)
    },
    {
        path: 'admin/certificats',
        loadComponent: () => import('./components/admin/certificats/certificats.component').then(m => m.CertificatsComponent)
    }
];
