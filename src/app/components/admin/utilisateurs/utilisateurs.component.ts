import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, FormsModule,],
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent {
  // Fermer le modal si clic dehors
  onModalBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.closeCreateModal();
    }
  }
  // Phone logic (repris de signup)
  phone: string = '';
  showCountryDropdown: boolean = false;
  selectedCountry = {
    code: '+221',
    name: 'Sénégal',
    flag: '🇸🇳'
  };
  countries = [
    { code: '+221', name: 'Sénégal', flag: '🇸🇳' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+1', name: 'États-Unis', flag: '🇺🇸' },
    { code: '+44', name: 'Royaume-Uni', flag: '🇬🇧' },
    { code: '+225', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: '+212', name: 'Maroc', flag: '🇲🇦' },
    { code: '+213', name: 'Algérie', flag: '🇩🇿' },
    { code: '+216', name: 'Tunisie', flag: '🇹🇳' },
    { code: '+237', name: 'Cameroun', flag: '🇨🇲' },
    { code: '+49', name: 'Allemagne', flag: '🇩🇪' },
    { code: '+39', name: 'Italie', flag: '🇮🇹' },
    { code: '+34', name: 'Espagne', flag: '🇪🇸' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+32', name: 'Belgique', flag: '🇧🇪' },
    { code: '+41', name: 'Suisse', flag: '🇨🇭' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' }
  ];

  toggleCountryDropdown(): void {
    this.showCountryDropdown = !this.showCountryDropdown;
  }

  selectCountry(country: any): void {
    this.selectedCountry = country;
    this.showCountryDropdown = false;
  }

  // Pour fermer le dropdown si clic extérieur (HostListener analogue)
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.country-selector-container');
    if (!clickedInside && this.showCountryDropdown) {
      this.showCountryDropdown = false;
    }
  }
  showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
  stats = {
    clients: { count: 12, change: '+3 ce mois' },
    agents: { count: 15, change: '12% vs semaine dernière' },
    administrateurs: { count: 2, change: '+2 nouveaux ce mois' }
  };

  users = [
    {
      id: '#0004',
      initials: 'AS',
      name: 'Aminata Sow',
      email: 'aminata.sow@mail.com',
      role: 'Client',
      lastActivity: '2025-09-24 10:15',
      status: 'Actif'
    },
    {
      id: '#0003',
      initials: 'BT',
      name: 'Boubacar Touré',
      email: 'b.toure@mail.com',
      role: 'Agent',
      lastActivity: '2025-09-25 16:02',
      status: 'Actif'
    },
    {
      id: '#0002',
      initials: 'FD',
      name: 'Fatou Diop',
      email: 'fatou.diop@mail.com',
      role: 'Client',
      lastActivity: '--',
      status: 'Inactif'
    },
    {
      id: '#0001',
      initials: 'GK',
      name: 'Gerald Keita',
      email: 'gerald.keita@mail.com',
      role: 'Administrateur',
      lastActivity: '2025-09-26 09:10',
      status: 'Actif'
    }
  ];

  currentPage = 1;
  totalPages = 10;

  getRoleColor(role: string): string {
    switch (role) {
      case 'Client': return 'text-emerald-600 bg-emerald-50';
      case 'Agent': return 'text-gray-600 bg-gray-50';
      case 'Administrateur': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'Client': return '👤';
      case 'Agent': return '👥';
      case 'Administrateur': return '🛡️';
      default: return '👤';
    }
  }
}