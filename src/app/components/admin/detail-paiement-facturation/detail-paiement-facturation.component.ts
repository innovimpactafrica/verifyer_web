import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-detail-paiement-facturation',
    standalone: true,
    imports: [CommonModule, RouterModule, AdminSidebarComponent],
    templateUrl: './detail-paiement-facturation.component.html',
    styleUrl: './detail-paiement-facturation.component.css'
})
export class DetailPaiementFacturationComponent implements OnInit {
    paiementId: string = '';
    paiementDetails: any = null;

    // Données simulées des paiements avec détails
    private paiements = [
        {
            id: 'TX-005',
            factureId: 'FAC-2025-005',
            facture: 'Paiement TX-005',
            demande: 'DEM-145',
            client: 'Moussa Diop',
            zone: 'Dakar',
            montant: '150 000 F',
            date: '2025-09-20',
            moyen: 'Carte bancaire',
            iconType: 'card',
            status: 'En attente',
            statusColor: 'bg-orange-100 text-orange-800',
            reference: 'TX-005',
            typeBien: 'Appartement',
            adresse: 'Mermoz, Dakar',
            nombrePieces: '3 pièces',
            superficie: '85 m²',
            dateEmission: '15/09/2025',
            dateEcheance: '20/10/2025',
            description: 'Certification énergétique pour appartement résidentiel',
            historiqueItems: [
                { action: 'Statut mis à "En attente"', date: '2025-09-20 14:30', icon: 'user' },
                { action: 'Paiement initié', date: '2025-09-20 14:15', icon: 'plus' },
                { action: 'Demande validée', date: '2025-09-15 10:00', icon: 'card' }
            ]
        },
        {
            id: 'TX-004',
            factureId: 'FAC-2025-004',
            facture: 'Paiement TX-004',
            demande: 'DEM-143',
            client: 'Awa Ndiaye',
            zone: 'Thiès',
            montant: '120 000 F',
            date: '2025-09-18',
            moyen: 'Mobile money',
            iconType: 'mobile',
            status: 'Payé',
            statusColor: 'bg-green-100 text-green-800',
            reference: 'TX-004',
            typeBien: 'Maison',
            adresse: 'Centre-ville, Thiès',
            nombrePieces: '5 pièces',
            superficie: '120 m²',
            dateEmission: '10/09/2025',
            dateEcheance: '18/09/2025',
            description: 'Certification environnementale pour maison individuelle',
            historiqueItems: [
                { action: 'Paiement confirmé', date: '2025-09-18 16:45', icon: 'user' },
                { action: 'Transaction en cours', date: '2025-09-18 16:40', icon: 'plus' },
                { action: 'Paiement initié', date: '2025-09-18 16:35', icon: 'card' }
            ]
        },
        {
            id: 'TX-003',
            factureId: 'FAC-2025-003',
            facture: 'Paiement TX-003',
            demande: 'DEM-142',
            client: 'Cheikh Sy',
            zone: 'Saint-Louis',
            montant: '200 000 F',
            date: '2025-09-15',
            moyen: 'Carte bancaire',
            iconType: 'card',
            status: 'Échoué',
            statusColor: 'bg-red-100 text-red-800',
            reference: 'TX-003',
            typeBien: 'Villa',
            adresse: 'Hydrobase, Saint-Louis',
            nombrePieces: '7 pièces',
            superficie: '250 m²',
            dateEmission: '05/09/2025',
            dateEcheance: '15/09/2025',
            description: 'Certification complète pour villa de standing',
            historiqueItems: [
                { action: 'Paiement échoué - Carte refusée', date: '2025-09-15 11:20', icon: 'user' },
                { action: 'Tentative de paiement', date: '2025-09-15 11:18', icon: 'plus' },
                { action: 'Demande créée', date: '2025-09-05 09:00', icon: 'card' }
            ]
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        this.paiementId = this.route.snapshot.paramMap.get('id') || '';
        this.loadPaiementDetails();
    }

    loadPaiementDetails(): void {
        this.paiementDetails = this.paiements.find(p => p.id === this.paiementId);
    }

    getIconBgClass(iconType: string): string {
        switch (iconType) {
            case 'card':
                return 'bg-[#0D823B0D]';
            case 'mobile':
                return 'bg-blue-50';
            default:
                return 'bg-gray-50';
        }
    }

    getIconSvg(iconType: string): SafeHtml {
        let svg = '';

        switch (iconType) {
            case 'card':
                svg = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="20" height="14" rx="2" stroke="#0D823B" stroke-width="2"/>
            <path d="M2 10H22" stroke="#0D823B" stroke-width="2"/>
            <rect x="6" y="14" width="4" height="2" rx="1" fill="#0D823B"/>
          </svg>
        `;
                break;
            case 'mobile':
                svg = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="2" width="12" height="20" rx="2" stroke="#3B82F6" stroke-width="2"/>
            <path d="M6 6H18" stroke="#3B82F6" stroke-width="2"/>
            <circle cx="12" cy="18" r="1" fill="#3B82F6"/>
          </svg>
        `;
                break;
            default:
                svg = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="2"/>
          </svg>
        `;
        }

        return this.sanitizer.sanitize(1, svg) as SafeHtml;
    }

    getStatutClass(status: string): string {
        switch (status) {
            case 'Payé':
                return 'bg-green-100 text-green-800';
            case 'En attente':
                return 'bg-orange-100 text-orange-800';
            case 'Échoué':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    retryPayment(): void {
        console.log('Retry payment for:', this.paiementId);
        // Logique de réessai de paiement
    }

    downloadInvoice(): void {
        console.log('Download invoice for:', this.paiementId);
        // Logique de téléchargement de facture
    }

    contactSupport(): void {
        console.log('Contact support for:', this.paiementId);
        // Logique de contact support
    }
}
