import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
    selector: 'app-paiements',
    standalone: true,
    imports: [CommonModule, RouterModule, SidebarComponent],
    templateUrl: './paiements.component.html',
    styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent {
    paiements = [
        { intitule: 'Facture Paiement T1 A', ref: 'FAC-2025-05', montant: '98 393 FCFA', date: '15/12/2025', statut: 'Payé', methode: 'carte' },
        { intitule: 'Facture Paiement T1 B', ref: 'FAC-2025-04', montant: '98 393 FCFA', date: '30/06/2025', statut: 'Payé', methode: 'mobile' },
        { intitule: 'Facture Paiement T1 C', ref: 'FAC-2025-03', montant: '120 000 FCFA', date: '30/06/2025', statut: 'Payé', methode: 'mobile' },
        { intitule: 'Facture Paiement T1 D', ref: 'FAC-2025-01', montant: '310 000 FCFA', date: '30/06/2025', statut: 'Payé', methode: 'carte' },
    ];
}


