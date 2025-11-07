import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

type AdminNavItem = {
    label: string;
    route: string | string[];
    // optional: could be used to namespace icons later
    iconKey: string;
    subItems?: { label: string; route: string; iconKey?: string }[];
};

@Component({
    selector: 'app-admin-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
    currentUrl: string = '';
    statsMenuOpen: boolean = false;

    // Centralized config for maintainability
    navItems: AdminNavItem[] = [
        { label: 'Tableau de bord', route: ['/admin/dashboard'], iconKey: 'admin/dashboard' },
        { label: 'Gestion des utilisateurs', route: ['/admin/utilisateurs'], iconKey: 'users' },
        { label: 'Gestion des missions', route: ['/admin/missions'], iconKey: 'missions' },
        { label: 'Gestion des rapports', route: ['/admin/rapports'], iconKey: 'reports' },
        { label: 'Gestion des certificats', route: ['/admin/certificats'], iconKey: 'certificats' },
        { label: 'Renouvellement', route: ['/admin/renouvellement'], iconKey: 'refresh' },
        { label: 'Paiement & facturation', route: ['/admin/paiement-facturation'], iconKey: 'billing' },
        {
            label: 'Statistiques',
            route: ['/admin/statistiques'],
            iconKey: 'stats',
            subItems: [
                { label: 'Activités', route: '/admin/statistiques/activites' },
                { label: 'Agents', route: '/admin/statistiques/agents' }
            ]
        },
    ];

    constructor(private router: Router) {
        this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
            this.currentUrl = e.url;
        });
        this.currentUrl = this.router.url;
    }

    isActive(route: string | string[]): boolean {
        const r = Array.isArray(route) ? route.join('/') : route;
        // Custom logic for robust active state on admin sections
        if (r === '/admin/utilisateurs') {
            return this.currentUrl.startsWith('/admin/utilisateurs');
        }
        if (r === '/admin/missions') {
            return this.currentUrl.startsWith('/admin/missions');
        }
        if (r === '/admin/rapports') {
            return this.currentUrl.startsWith('/admin/rapports');
        }
        if (r === '/admin/certificats') {
            return this.currentUrl.startsWith('/admin/certificats');
        }
        if (r === '/admin/renouvellement') {
            return this.currentUrl.startsWith('/admin/renouvellement');
        }
        if (r === '/admin/paiement-facturation') {
            return this.currentUrl.startsWith('/admin/paiement-facturation') ||
                this.currentUrl.startsWith('/admin/detail-paiement-facturation');
        }
        if (r === '/admin/statistiques') {
            return this.currentUrl.startsWith('/admin/statistiques');
        }
        // Dashboard (root)
        if (r === '/admin/dashboard') {
            return this.currentUrl === '/admin/dashboard';
        }
        // Fallback: default Angular logic
        return this.currentUrl.startsWith(r);
    }

    toggleStatsMenu(): void {
        this.statsMenuOpen = !this.statsMenuOpen;
    }
}


