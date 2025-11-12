import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientSidebarComponent } from '../client-sidebar/client-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface StatCard {
    title: string;
    value: string;
    bgColor: string;
    iconSvg: string;
}

interface Paiement {
    intitule: string;
    ref: string;
    montant: string;
    date: string;
    statut: string;
    methode: 'carte' | 'mobile';
}

@Component({
    selector: 'app-paiements',
    standalone: true,
    imports: [CommonModule, RouterModule, ClientSidebarComponent],
    templateUrl: './paiements.component.html',
    styleUrls: ['./paiements.component.css']
})
export class PaiementsComponent {

    // Dictionnaire des icônes de cartes statistiques
    statsCards: StatCard[] = [
        {
            title: 'Total de paiements',
            value: '04',
            bgColor: 'bg-gradient-to-r from-[#5E72E4] to-[#825EE4]',
            iconSvg: `<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.32458 13.1513H0.915573C0.410177 13.1513 0 12.7305 0 12.2119V0.939379C0 0.420842 0.410177 0 0.915573 0H17.3959C17.9013 0 18.3115 0.420842 18.3115 0.939379V5.63628H16.4803V1.87876H1.83115V11.2726H7.32458V13.1513Z" fill="white"/>
                <path d="M15.5648 15.0301C12.8629 15.0301 10.6179 14.4298 9.15576 13.4219C9.15576 14.1227 9.15576 14.5848 9.15576 15.0301C9.15576 16.5866 12.0252 17.8482 15.5648 17.8482C19.1044 17.8482 21.9738 16.5866 21.9738 15.0301C21.9738 14.5848 21.9738 14.1227 21.9738 13.4219C20.5116 14.4298 18.2666 15.0301 15.5648 15.0301Z" fill="white"/>
                <path d="M15.5648 19.7269C12.8629 19.7269 10.6179 19.1266 9.15576 18.1187C9.15576 18.8194 9.15576 19.2816 9.15576 19.7269C9.15576 21.2834 12.0252 22.545 15.5648 22.545C19.1044 22.545 21.9738 21.2834 21.9738 19.7269C21.9738 19.2816 21.9738 18.8194 21.9738 18.1187C20.5116 19.1266 18.2666 19.7269 15.5648 19.7269Z" fill="white"/>
                <path d="M8.15672 8.14618C8.7848 7.39374 9.74432 6.77938 10.9639 6.34633C10.8531 5.4201 10.0895 4.69678 9.15561 4.69678C8.14573 4.69678 7.32446 5.5394 7.32446 6.57554C7.32446 7.2331 7.65682 7.81082 8.15672 8.14618Z" fill="white"/>
                <path d="M15.5648 13.1514C19.1044 13.1514 21.9738 11.8897 21.9738 10.3333C21.9738 8.77686 19.1044 7.51514 15.5648 7.51514C12.0252 7.51514 9.15576 8.77686 9.15576 10.3333C9.15576 11.8897 12.0252 13.1514 15.5648 13.1514Z" fill="white"/>
            </svg>`
        },
        {
            title: 'Montant total',
            value: '570 682 F CFA',
            bgColor: 'bg-[#0D823B]',
            iconSvg: `<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.32458 13.1513H0.915573C0.410177 13.1513 0 12.7305 0 12.2119V0.939379C0 0.420842 0.410177 0 0.915573 0H17.3959C17.9013 0 18.3115 0.420842 18.3115 0.939379V5.63628H16.4803V1.87876H1.83115V11.2726H7.32458V13.1513Z" fill="white"/>
                <path d="M15.5648 15.0301C12.8629 15.0301 10.6179 14.4298 9.15576 13.4219C9.15576 14.1227 9.15576 14.5848 9.15576 15.0301C9.15576 16.5866 12.0252 17.8482 15.5648 17.8482C19.1044 17.8482 21.9738 16.5866 21.9738 15.0301C21.9738 14.5848 21.9738 14.1227 21.9738 13.4219C20.5116 14.4298 18.2666 15.0301 15.5648 15.0301Z" fill="white"/>
                <path d="M15.5648 19.7269C12.8629 19.7269 10.6179 19.1266 9.15576 18.1187C9.15576 18.8194 9.15576 19.2816 9.15576 19.7269C9.15576 21.2834 12.0252 22.545 15.5648 22.545C19.1044 22.545 21.9738 21.2834 21.9738 19.7269C21.9738 19.2816 21.9738 18.8194 21.9738 18.1187C20.5116 19.1266 18.2666 19.7269 15.5648 19.7269Z" fill="white"/>
                <path d="M8.15648 8.14618C8.78456 7.39374 9.74408 6.77938 10.9636 6.34633C10.8528 5.4201 10.0892 4.69678 9.15536 4.69678C8.14549 4.69678 7.32422 5.5394 7.32422 6.57554C7.32422 7.2331 7.65657 7.81082 8.15648 8.14618Z" fill="white"/>
                <path d="M15.5648 13.1514C19.1044 13.1514 21.9738 11.8897 21.9738 10.3333C21.9738 8.77686 19.1044 7.51514 15.5648 7.51514C12.0252 7.51514 9.15576 8.77686 9.15576 10.3333C9.15576 11.8897 12.0252 13.1514 15.5648 13.1514Z" fill="white"/>
            </svg>`
        },
        {
            title: 'Dernière transaction',
            value: '15/12/2025',
            bgColor: 'bg-[#274B9B]',
            iconSvg: `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 0.75V4.75M5.75 0.75V4.75M18.75 10.75C18.75 6.979 18.75 5.093 17.578 3.922C16.406 2.751 14.521 2.75 10.75 2.75H8.75C4.979 2.75 3.093 2.75 1.922 3.922C0.751 5.094 0.75 6.979 0.75 10.75V12.75C0.75 16.521 0.75 18.407 1.922 19.578C3.094 20.749 4.979 20.75 8.75 20.75M0.75 8.75H18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.017 17.451L14.75 16.75V15.017M18.75 16.75C18.75 17.8109 18.3286 18.8283 17.5784 19.5784C16.8283 20.3286 15.8109 20.75 14.75 20.75C13.6891 20.75 12.6717 20.3286 11.9216 19.5784C11.1714 18.8283 10.75 17.8109 10.75 16.75C10.75 15.6891 11.1714 14.6717 11.9216 13.9216C12.6717 13.1714 13.6891 12.75 14.75 12.75C15.8109 12.75 16.8283 13.1714 17.5784 13.9216C18.3286 14.6717 18.75 15.6891 18.75 16.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`
        }
    ];

    // Dictionnaire des icônes de méthodes de paiement
    methodesIcons: { [key: string]: string } = {
        'carte': `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.75 8.75C0.75 4.979 0.75 3.093 1.922 1.922C3.094 0.751 4.979 0.75 8.75 0.75H12.75C16.521 0.75 18.407 0.75 19.578 1.922C20.749 3.094 20.75 4.979 20.75 8.75C20.75 12.521 20.75 14.407 19.578 15.578C18.406 16.749 16.521 16.75 12.75 16.75H8.75C4.979 16.75 3.093 16.75 1.922 15.578C0.751 14.406 0.75 12.521 0.75 8.75Z" stroke="#0D823B" stroke-width="1.5"/>
            <path opacity="0.5" d="M8.75 12.75H4.75M12.75 12.75H11.25M0.75 6.75H20.75" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,
        'mobile': `<svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3333 0.952148H3.80954C2.23158 0.952148 0.952393 2.23133 0.952393 3.80929V19.0474C0.952393 20.6253 2.23158 21.9045 3.80954 21.9045H13.3333C14.9113 21.9045 16.1905 20.6253 16.1905 19.0474V3.80929C16.1905 2.23133 14.9113 0.952148 13.3333 0.952148Z" stroke="#274B9B" stroke-width="1.90476" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.66675 18.095H10.4763" stroke="#274B9B" stroke-width="1.90476" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    };

    paiements: Paiement[] = [
        { intitule: 'Facture Paiement T1 A', ref: 'FAC-2025-05', montant: '98 393 FCFA', date: '15/12/2025', statut: 'Payé', methode: 'carte' },
        { intitule: 'Facture Paiement T1 B', ref: 'FAC-2025-04', montant: '98 393 FCFA', date: '30/06/2025', statut: 'Payé', methode: 'mobile' },
        { intitule: 'Facture Paiement T1 C', ref: 'FAC-2025-03', montant: '120 000 FCFA', date: '30/06/2025', statut: 'Payé', methode: 'mobile' },
        { intitule: 'Facture Paiement T1 D', ref: 'FAC-2025-01', montant: '310 000 FCFA', date: '30/06/2025', statut: 'Payé', methode: 'carte' },
    ];

    constructor(private sanitizer: DomSanitizer) { }

    getSafeHtml(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }

    getMethodeIconSvg(methode: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(this.methodesIcons[methode] || '');
    }

    getMethodeBgClass(methode: string): string {
        return methode === 'carte' ? 'bg-[#0D823B0D]' : 'bg-[#274B9B14]';
    }
}


