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
            client: 'Aminata Sow',
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
            client: 'Mame Diouf',
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
            client: 'Fatou Diop',
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
               svg = `<svg width="25" height="23" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 8.75C0.75 4.979 0.75 3.093 1.922 1.922C3.094 0.751 4.979 0.75 8.75 0.75H12.75C16.521 0.75 18.407 0.75 19.578 1.922C20.749 3.094 20.75 4.979 20.75 8.75C20.75 12.521 20.75 14.407 19.578 15.578C18.406 16.749 16.521 16.75 12.75 16.75H8.75C4.979 16.75 3.093 16.75 1.922 15.578C0.751 14.406 0.75 12.521 0.75 8.75Z" stroke="#0D823B" stroke-width="1.5"/>
                <path opacity="0.5" d="M8.75 12.75H4.75M12.75 12.75H11.25M0.75 6.75H20.75" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round"/>
               </svg>`;
                break;
            case 'mobile':
               svg = `<svg width="25" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3341 0.952148H3.81027C2.23231 0.952148 0.953125 2.23133 0.953125 3.80929V19.0474C0.953125 20.6253 2.23231 21.9045 3.81027 21.9045H13.3341C14.912 21.9045 16.1912 20.6253 16.1912 19.0474V3.80929C16.1912 2.23133 14.912 0.952148 13.3341 0.952148Z" stroke="#274B9B" stroke-width="1.90476" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66797 18.095H10.4775" stroke="#274B9B" stroke-width="1.90476" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>`;
                break;
            default:
                svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="2"/>
          </svg>`;
        }

        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }

    getStatutClass(status: string): string {
        switch (status) {
            case 'Payé':
                return 'text-[#16A34A] bg-[#0D823B0D]';
            case 'En attente':
                return 'text-[#A16207] bg-[#FFF4E5]';
            case 'Échoué':
                return 'text-[#F87171] bg-red-50';
            default:
                return 'text-emerald-600 bg-[#0D823B0D]';
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
