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
    showQRModal: boolean = false;
    selectedCertification: any = null;
    // Renouvellement modal state
    showRenewModal: boolean = false;
    selectedForRenewal: any = null;
    selectedPaymentMethod: 'carte' | 'mobile' = 'carte';

    ngOnInit(): void {
        this.loadCertifications();
    }

    loadCertifications(): void {
        // TODO: Load certifications from backend
        const today = new Date();

        this.certifications = [
            {
                id: this.generateCertId(),
                nom: 'Appartement A',
                reference: 'CERT-006',
                type: 'Immobilier',
                dureeValidite: '6 mois',
                dateEmission: this.formatDate(new Date(2023, 4, 15)),
                dateExpiration: this.formatDate(new Date(2024, 4, 15)),
                score: 92,
                statut: 'Valide'
            },
            {
                id: this.generateCertId(),
                nom: 'Villa A',
                reference: 'CERT-005',
                type: 'Immobilier',
                dureeValidite: '6 mois',
                dateEmission: this.formatDate(new Date(2023, 2, 10)),
                dateExpiration: this.formatDate(new Date(2024, 2, 10)),
                score: 88,
                statut: 'Valide'
            },
            {
                id: this.generateCertId(),
                nom: 'Restaurant Le Saloum',
                reference: 'CERT-003',
                type: 'Restaurant',
                dureeValidite: '6 mois',
                dateEmission: this.formatDate(new Date(2022, 11, 5)),
                dateExpiration: this.formatDate(new Date(2023, 11, 5)),
                score: 84,
                statut: 'En renouvellement'
            },
            {
                id: this.generateCertId(),
                nom: 'Hôtel du Parc',
                reference: 'CERT-002',
                type: 'Hôtel',
                dureeValidite: '6 mois',
                dateEmission: this.formatDate(new Date(2022, 9, 20)),
                dateExpiration: this.formatDate(new Date(2023, 9, 20)),
                score: 90,
                statut: 'En renouvellement'
            },
            {
                id: this.generateCertId(),
                nom: 'Menuiserie Ndiambour',
                reference: 'CERT-001',
                type: 'Artisan',
                dureeValidite: '6 mois',
                dateEmission: this.formatDate(new Date(2022, 7, 15)),
                dateExpiration: this.formatDate(new Date(2023, 7, 15)),
                score: 78,
                statut: 'Expiré'
            }
        ];
    }

    generateCertId(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `CERT-${timestamp.toString().slice(-6)}${random.toString().padStart(3, '0')}`;
    }

    formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    openQRModal(certification: any): void {
        this.selectedCertification = certification;
        this.showQRModal = true;
    }

    closeQRModal(): void {
        this.showQRModal = false;
        this.selectedCertification = null;
    }

    downloadCertificate(): void {
        // TODO: Implement certificate download logic
        console.log('Téléchargement du certificat:', this.selectedCertification);
    }

    // Open renewal modal from "Refresh" action
    openRenewModal(cert: any): void {
        this.selectedForRenewal = cert;
        this.selectedPaymentMethod = 'carte';
        this.showRenewModal = true;
    }

    closeRenewModal(): void {
        this.showRenewModal = false;
        this.selectedForRenewal = null;
    }

    selectPaymentMethod(method: 'carte' | 'mobile'): void {
        this.selectedPaymentMethod = method;
    }

    processRenewalPayment(): void {
        // Design only: simulate payment
        console.log('Paiement renouvellement:', {
            certification: this.selectedForRenewal?.reference,
            method: this.selectedPaymentMethod
        });
        this.closeRenewModal();
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
