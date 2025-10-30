import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-certificats',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './certificats.component.html',
  styleUrls: ['./certificats.component.css']
})
export class CertificatsComponent {
  stats = {
    valides: { count: 8, change: '+2 nouveaux ce mois' },
    expires: { count: 3, change: '+3 ce mois' }
  };

  certificats = [
    {
      id: 'CERT-006',
      name: 'Appartement A',
      type: 'Immobilier',
      icon: 'house',
      iconColor: 'text-emerald-600 bg-emerald-50',
      dureeValidite: '6 mois',
      agent: 'Aminata Sow',
      dateVerification: '15/05/2024',
      score: 92,
      scoreColor: 'bg-emerald-600',
      status: 'Valide',
      statusColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'CERT-005',
      name: 'Villa A',
      type: 'Immobilier',
      icon: 'house',
      iconColor: 'text-emerald-600 bg-emerald-50',
      dureeValidite: '6 mois',
      agent: 'Mame Diouf',
      dateVerification: '10/03/2024',
      score: 88,
      scoreColor: 'bg-emerald-600',
      status: 'Valide',
      statusColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'CERT-003',
      name: 'Restaurant Le Saloum',
      type: 'Restaurant',
      icon: 'utensils',
      iconColor: 'text-purple-600 bg-purple-50',
      dureeValidite: '6 mois',
      agent: 'Fatou Diop',
      dateVerification: '05/12/2023',
      score: 84,
      scoreColor: 'bg-emerald-600',
      status: 'Expiré',
      statusColor: 'text-red-600 bg-red-50'
    },
    {
      id: 'CERT-002',
      name: 'Hôtel du Parc',
      type: 'Hôtel',
      icon: 'bed',
      iconColor: 'text-orange-600 bg-orange-50',
      dureeValidite: '6 mois',
      agent: 'Boubacar Touré',
      dateVerification: '20/10/2023',
      score: 90,
      scoreColor: 'bg-emerald-600',
      status: 'Expiré',
      statusColor: 'text-red-600 bg-red-50'
    },
    {
      id: 'CERT-001',
      name: 'Menuiserie Ndiambour',
      type: 'Artisan',
      icon: 'tools',
      iconColor: 'text-blue-600 bg-blue-50',
      dureeValidite: '6 mois',
      agent: 'Boubacar Touré',
      dateVerification: '15/08/2023',
      score: 78,
      scoreColor: 'bg-yellow-500',
      status: 'Expiré',
      statusColor: 'text-red-600 bg-red-50'
    }
  ];

  viewMode: 'list' | 'grid' = 'list';
  currentPage = 1;
  totalPages = 10;

  setViewMode(mode: 'list' | 'grid') {
    this.viewMode = mode;
  }

  getScoreWidth(score: number): string {
    return `${score}%`;
  }

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