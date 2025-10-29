import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-client-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './client-sidebar.component.html',
    styleUrls: ['./client-sidebar.component.css']
})
export class ClientSidebarComponent {
    currentUrl: string = '';

    constructor(private router: Router) {
        // Écouter les changements de route
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.currentUrl = event.url;
        });

        // Initialiser avec l'URL actuelle
        this.currentUrl = this.router.url;
    }

    // Vérifier si le lien "Mes demandes" doit être actif
    isDemandesActive(): boolean {
        return this.currentUrl.includes('/mes-demandes') ||
            this.currentUrl.includes('/nouvelle-demande') ||
            this.currentUrl.includes('/detail-paiement') ||
            this.currentUrl.includes('/validation-demande');
    }

    // Vérifier si le lien "Mes certifications" doit être actif
    isCertificationsActive(): boolean {
        return this.currentUrl.includes('/mes-certifications') ||
            this.currentUrl.includes('/detail-certification');
    }
}
