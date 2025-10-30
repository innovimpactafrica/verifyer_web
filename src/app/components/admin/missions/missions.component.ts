import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent {
  stats = {
    agentsDisponibles: { count: 15, change: '12% vs semaine dernière', trend: 'up' },
    agentsOccupes: { count: 5, change: '2 terminées cette semaine', trend: 'down' },
    missionsEnAttente: { count: 12, change: '+3 ce mois', trend: 'up' },
    missionsAssignees: { count: 8, change: '+2 nouveaux ce mois', trend: 'up' }
  };

  missions = [
    {
      id: 'MS-006',
      name: 'Résidence Samba',
      type: 'Immeuble',
      icon: 'house',
      iconColor: 'text-emerald-600 bg-emerald-50',
      address: 'Dakar • Sicap, Rue 12',
      client: 'Aminata Sow',
      date: '15/05/2023',
      status: 'Assignée',
      statusColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'MS-002',
      name: 'Blue Lodge',
      type: 'Hôtel',
      icon: 'bed',
      iconColor: 'text-orange-600 bg-orange-50',
      address: 'Zone: Saint-Louis • Sor, Rue 3',
      client: 'Mame Diouf',
      date: '20/10/2022',
      status: 'En attente',
      statusColor: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'MS-003',
      name: 'Restaurant Chez Bocar',
      type: 'Restaurant',
      icon: 'utensils',
      iconColor: 'text-purple-600 bg-purple-50',
      address: 'Zone: Dakar • Plateau, Bd',
      client: 'Fatou Diop',
      date: '05/12/2022',
      status: 'Assignée',
      statusColor: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'MS-001',
      name: 'Atelier Fama',
      type: 'Atelier',
      icon: 'tools',
      iconColor: 'text-blue-600 bg-blue-50',
      address: 'Zone: Saint-Louis • Sor, Rue 3',
      client: 'Boubacar Touré',
      date: '15/08/2022',
      status: 'Assignée',
      statusColor: 'text-emerald-600 bg-emerald-50'
    }
  ];

  currentPage = 1;
  totalPages = 10;

  getIconPath(icon: string): string {
    const icons: { [key: string]: string } = {
      house: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      bed: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      utensils: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      tools: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    };
    return icons[icon] || icons['house'];
  }
}