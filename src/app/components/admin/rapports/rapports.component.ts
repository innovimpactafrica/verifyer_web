import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent {
  stats = {
    enAttente: { count: 2, label: 'En attente de validation' },
    valides: { count: 1, label: 'Validés' },
    rejetes: { count: 1, label: 'Rejetés' }
  };

  rapports = [
    {
      id: 'RPT-2025-004',
      name: 'Résidence Samba',
      type: 'Immeuble',
      icon: 'house',
      iconColor: 'text-emerald-600 bg-emerald-50',
      zone: 'Dakar',
      agent: 'Ibrahima Ndiaye',
      client: 'Aminata Sow',
      date: '15/05/2023',
      status: 'En attente de validation',
      statusColor: 'text-yellow-700 bg-yellow-50'
    },
    {
      id: 'RPT-2025-003',
      name: 'Blue Lodge',
      type: 'Hôtel',
      icon: 'bed',
      iconColor: 'text-orange-600 bg-orange-50',
      zone: 'Thiès',
      agent: 'Cheikh Sarr',
      client: 'Mame Diouf',
      date: '20/10/2022',
      status: 'En attente de validation',
      statusColor: 'text-yellow-700 bg-yellow-50'
    },
    {
      id: 'RPT-2025-002',
      name: 'Restaurant Chez Bocar',
      type: 'Restaurant',
      icon: 'utensils',
      iconColor: 'text-purple-600 bg-purple-50',
      zone: 'Dakar',
      agent: 'Penda Faye',
      client: 'Fatou Diop',
      date: '05/12/2022',
      status: 'Validé',
      statusColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'RPT-2025-001',
      name: 'Atelier Fama',
      type: 'Atelier',
      icon: 'tools',
      iconColor: 'text-blue-600 bg-blue-50',
      zone: 'Saint-Louis',
      agent: 'Moussa Seck',
      client: 'Boubacar Touré',
      date: '15/08/2022',
      status: 'Rejeté',
      statusColor: 'text-red-600 bg-red-50'
    }
  ];

  currentPage = 1;
  totalPages = 10;

  // Méthode pour obtenir le SVG complet en HTML
  // Remplacez ces SVG par vos propres icônes personnalisées
  getIconSvg(icon: string): string {
    const icons: { [key: string]: string } = {
      house: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- Insérez votre SVG house ici -->
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      `,
      bed: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- Insérez votre SVG bed ici -->
          <path d="M2 4v16"></path>
          <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
          <path d="M2 17h20"></path>
          <path d="M6 8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"></path>
        </svg>
      `,
      utensils: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- Insérez votre SVG utensils ici -->
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
          <path d="M7 2v20"></path>
          <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
        </svg>
      `,
      tools: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- Insérez votre SVG tools ici -->
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
      `
    };
    return icons[icon] || icons['house'];
  }
}