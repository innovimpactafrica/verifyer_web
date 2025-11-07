import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

type ClientNavItem = {
    label: string;
    route: string | string[];
    iconKey: string;
};

@Component({
    selector: 'app-client-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './client-sidebar.component.html',
    styleUrls: ['./client-sidebar.component.css']
})
export class ClientSidebarComponent {
    currentUrl: string = '';

    // Centralized config for maintainability
    navItems: ClientNavItem[] = [
        { label: 'Tableau de bord', route: ['/dashboard'], iconKey: 'dashboard' },
        { label: 'Mes demandes', route: ['/mes-demandes'], iconKey: 'demandes' },
        { label: 'Mes certifications', route: ['/mes-certifications'], iconKey: 'certifications' },
        { label: 'Paiements', route: ['/paiements'], iconKey: 'paiements' },
    ];

    constructor(private router: Router) {
        this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e: any) => {
            this.currentUrl = e.url;
        });
        this.currentUrl = this.router.url;
    }

    isActive(route: string | string[]): boolean {
        const r = Array.isArray(route) ? route.join('/') : route;
        // Custom logic for robust active state on client sections
        if (r === '/mes-demandes') {
            return this.currentUrl.startsWith('/mes-demandes') ||
                this.currentUrl.startsWith('/nouvelle-demande') ||
                this.currentUrl.startsWith('/detail-paiement') ||
                this.currentUrl.startsWith('/validation-demande');
        }
        if (r === '/mes-certifications') {
            return this.currentUrl.startsWith('/mes-certifications') ||
                this.currentUrl.startsWith('/detail-certification');
        }
        if (r === '/paiements') {
            return this.currentUrl.startsWith('/paiements');
        }
        // Dashboard (root)
        if (r === '/dashboard') {
            return this.currentUrl === '/dashboard';
        }
        // Fallback: default Angular logic
        return this.currentUrl.startsWith(r);
    }
}
