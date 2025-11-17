import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
    selector: 'app-paiement-facturation',
    standalone: true,
    imports: [CommonModule, RouterModule, AdminSidebarComponent],
    templateUrl: './paiement-facturation.component.html',
    styleUrl: './paiement-facturation.component.css'
})
export class PaiementFacturationComponent {
    constructor(private sanitizer: DomSanitizer) { }

    stats = {
        revenus: { count: '180 000 F', label: 'Revenus' },
        enAttente: { count: '02', label: 'En attente' },
        payes: { count: '01', label: 'Payés' },
        echoues: { count: '02', label: 'Échoués' }
    };

    paiements = [
        {
            id: 'TX-005',
            factureId: 'FAC-2025-005',
            facture: 'Paiement TX-005',
            demande: 'DEM-145',
            client: 'Aminata Sow',
            zone: 'Dakar',
            montant: '85 000',
            date: '2025-09-20',
            moyen: 'Carte bancaire',
            status: 'En attente',
            statusColor: 'text-[#A16207] bg-[#FFF4E5]',
            iconType: 'card'
        },
        {
            id: 'TX-004',
            factureId: 'FAC-2025-004',
            facture: 'Paiement TX-004',
            demande: 'DEM-143',
            client: 'Mame Diouf',
            zone: 'Thiès',
            montant: '120 000',
            date: '2025-09-20',
            moyen: 'Mobile money',
            status: 'Payé',
            statusColor: 'text-[#16A34A] bg-[#0D823B0D]',
            iconType: 'mobile'
        },
        {
            id: 'TX-003',
            factureId: 'FAC-2025-003',
            facture: 'Paiement TX-003',
            demande: 'DEM-143',
            client: 'Fatou Diop',
            zone: 'Dakar',
            montant: '95 000',
            date: '2025-09-20',
            moyen: 'Carte bancaire',
            status: 'Payé',
            statusColor: 'text-[#16A34A] bg-[#0D823B0D]',
            iconType: 'card'
        },
        {
            id: 'TX-002',
            factureId: 'FAC-2025-002',
            facture: 'Paiement TX-002',
            demande: 'DEM-142',
            client: 'Boubacar Touré',
            zone: 'Saint-Louis',
            montant: '78 000',
            date: '2025-09-20',
            moyen: 'Mobile money',
            status: 'Échoué',
            statusColor: 'text-[#F87171] bg-red-50',
            iconType: 'mobile'
        },
        {
            id: 'TX-001',
            factureId: 'FAC-2025-001',
            facture: 'Paiement TX-001',
            demande: 'DEM-141',
            client: 'Aminata Sow',
            zone: 'Dakar',
            montant: '85 000',
            date: '2025-09-20',
            moyen: 'Mobile money',
            status: 'Payé',
            statusColor: 'text-[#16A34A] bg-[#0D823B0D]',
            iconType: 'mobile'
        }
    ];

    currentPage = 1;
    totalPages = 10;

    // Filter properties
    selectedStatus: string = 'Toutes les status';
    selectedZone: string = 'Toutes zones';
    selectedType: string = 'Tous types';
    showStatusDropdown: boolean = false;
    showZoneDropdown: boolean = false;
    showTypeDropdown: boolean = false;

    statusOptions: string[] = ['Toutes les status', 'En attente', 'Payé', 'Échoué'];
    zoneOptions: string[] = ['Toutes zones', 'Dakar', 'Thiès', 'Saint-Louis'];
    typeOptions: string[] = ['Tous types', 'Carte bancaire', 'Mobile money'];

    // Toggle dropdown methods
    toggleStatusDropdown(): void {
        this.showStatusDropdown = !this.showStatusDropdown;
        this.showZoneDropdown = false;
        this.showTypeDropdown = false;
    }

    toggleZoneDropdown(): void {
        this.showZoneDropdown = !this.showZoneDropdown;
        this.showStatusDropdown = false;
        this.showTypeDropdown = false;
    }

    toggleTypeDropdown(): void {
        this.showTypeDropdown = !this.showTypeDropdown;
        this.showStatusDropdown = false;
        this.showZoneDropdown = false;
    }

    // Select filter methods
    selectStatus(status: string): void {
        this.selectedStatus = status;
        this.showStatusDropdown = false;
    }

    selectZone(zone: string): void {
        this.selectedZone = zone;
        this.showZoneDropdown = false;
    }

    selectType(type: string): void {
        this.selectedType = type;
        this.showTypeDropdown = false;
    }

    // Filtered paiements getter
    get filteredPaiements(): any[] {
        let filtered = this.paiements;

        // Filter by status
        if (this.selectedStatus !== 'Toutes les status') {
            filtered = filtered.filter(paiement => paiement.status === this.selectedStatus);
        }

        // Filter by zone
        if (this.selectedZone !== 'Toutes zones') {
            filtered = filtered.filter(paiement => paiement.zone === this.selectedZone);
        }

        // Filter by type (moyen de paiement)
        if (this.selectedType !== 'Tous types') {
            filtered = filtered.filter(paiement => paiement.moyen === this.selectedType);
        }

        return filtered;
    }

    // Close dropdowns on outside click
    @HostListener('document:click', ['$event'])
    closeDropdownsOnClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.filter-dropdown-container')) {
            this.showStatusDropdown = false;
            this.showZoneDropdown = false;
            this.showTypeDropdown = false;
        }
    }

    getIconColor(iconType: string): string {
        switch (iconType) {
            case 'card':
                return 'text-[#16A34A] bg-[#0D823B0D]';
            case 'mobile':
                return 'text-blue-600 bg-[#274B9B0F]';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    }

    getIconSvg(iconType: string): SafeHtml {
        let svg = '';
        switch (iconType) {
            case 'card':
                // Placeholder SVG pour carte bancaire
                svg = `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 8.75C0.75 4.979 0.75 3.093 1.922 1.922C3.094 0.751 4.979 0.75 8.75 0.75H12.75C16.521 0.75 18.407 0.75 19.578 1.922C20.749 3.094 20.75 4.979 20.75 8.75C20.75 12.521 20.75 14.407 19.578 15.578C18.406 16.749 16.521 16.75 12.75 16.75H8.75C4.979 16.75 3.093 16.75 1.922 15.578C0.751 14.406 0.75 12.521 0.75 8.75Z" stroke="#0D823B" stroke-width="1.5"/>
                <path opacity="0.5" d="M8.75 12.75H4.75M12.75 12.75H11.25M0.75 6.75H20.75" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round"/>
               </svg>`;
                break;
            case 'mobile':
                // Placeholder SVG pour mobile money
                svg = `<svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3341 0.952148H3.81027C2.23231 0.952148 0.953125 2.23133 0.953125 3.80929V19.0474C0.953125 20.6253 2.23231 21.9045 3.81027 21.9045H13.3341C14.912 21.9045 16.1912 20.6253 16.1912 19.0474V3.80929C16.1912 2.23133 14.912 0.952148 13.3341 0.952148Z" stroke="#274B9B" stroke-width="1.90476" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.66797 18.095H10.4775" stroke="#274B9B" stroke-width="1.90476" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>`;
                break;
            default:
                svg = `<svg width='20' height='20'><circle cx='10' cy='10' r='8' fill='#e5e7eb'/></svg>`;
        }
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }
}
