import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
    selector: 'app-mes-certifications',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    templateUrl: './mes-certifications.component.html',
    styleUrl: './mes-certifications.component.css'
})
export class MesCertificationsComponent implements OnInit {
    certifications: any[] = [];

    ngOnInit(): void {
        this.loadCertifications();
    }

    loadCertifications(): void {
        // TODO: Load certifications from backend
        this.certifications = [
            {
                id: 'CERT-006',
                nom: 'Appartement A',
                reference: 'CERT-006',
                type: 'Immobilier',
                dureeValidite: '6 mois',
                dateExpiration: '15/05/2024',
                score: 92,
                statut: 'Valide'
            },
            {
                id: 'CERT-005',
                nom: 'Villa A',
                reference: 'CERT-005',
                type: 'Immobilier',
                dureeValidite: '6 mois',
                dateExpiration: '10/03/2024',
                score: 88,
                statut: 'Valide'
            },
            {
                id: 'CERT-003',
                nom: 'Restaurant Le Saloum',
                reference: 'CERT-003',
                type: 'Restaurant',
                dureeValidite: '6 mois',
                dateExpiration: '05/12/2023',
                score: 84,
                statut: 'En renouvellement'
            },
            {
                id: 'CERT-002',
                nom: 'Hôtel du Parc',
                reference: 'CERT-002',
                type: 'Hôtel',
                dureeValidite: '6 mois',
                dateExpiration: '20/10/2023',
                score: 90,
                statut: 'En renouvellement'
            },
            {
                id: 'CERT-001',
                nom: 'Menuiserie Ndiambour',
                reference: 'CERT-001',
                type: 'Artisan',
                dureeValidite: '6 mois',
                dateExpiration: '15/08/2023',
                score: 78,
                statut: 'Expiré'
            }
        ];
    }

    getStatutClass(statut: string): string {
        switch (statut) {
            case 'Valide':
                return 'bg-[#0D823B0D] text-[#16A34A]';
            case 'En renouvellement':
                return 'bg-[#D6AB170F] text-[#D6AB17]';
            case 'Expiré':
                return 'bg-red-50 text-red-600';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    }

    getIconBgClass(type: string): string {
        switch (type) {
            case 'Immobilier':
                return 'bg-[#0D823B0D]';
            case 'Restaurant':
                return 'bg-[#6F42C10F]';
            case 'Hôtel':
                return 'bg-[#FD7E140F]';
            case 'Artisan':
                return 'bg-[#0891B20F]';
            default:
                return 'bg-gray-100';
        }
    }
}
