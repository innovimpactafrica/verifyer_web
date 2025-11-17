
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, FormsModule, RouterModule],
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

  constructor(
    private sanitizer: DomSanitizer
  ) { }

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
      status: 'Actif',
      statusColor: 'text-emerald-600 bg-[#0D823B0D]'
    },
    {
      id: '#0003',
      initials: 'BT',
      name: 'Boubacar Touré',
      email: 'b.toure@mail.com',
      role: 'Agent',
      lastActivity: '2025-09-25 16:02',
      status: 'Actif',
      statusColor: 'text-emerald-600 bg-[#0D823B0D]'
    },
    {
      id: '#0002',
      initials: 'FD',
      name: 'Fatou Diop',
      email: 'fatou.diop@mail.com',
      role: 'Client',
      lastActivity: '--',
      status: 'Inactif',
      statusColor: 'text-emerald-600 bg-[#0D823B0D]'
    },
    {
      id: '#0001',
      initials: 'GK',
      name: 'Gerald Keita',
      email: 'gerald.keita@mail.com',
      role: 'Administrateur',
      lastActivity: '2025-09-26 09:10',
      status: 'Actif',
      statusColor: 'text-emerald-600 bg-[#0D823B0D]'
    }
  ];

  currentPage = 1;
  totalPages = 10;

  // Filter properties
  selectedStatus: string = 'Tous les status';
  selectedRole: string = 'Tous les rôles';
  showStatusDropdown: boolean = false;
  showRoleDropdown: boolean = false;

  statusOptions: string[] = ['Tous les status', 'Actif', 'Inactif', 'Suspendu'];
  roleOptions: string[] = ['Tous les rôles', 'Client', 'Agent', 'Administrateur'];

  // Toggle dropdown methods
  toggleStatusDropdown(): void {
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showRoleDropdown = false; // Close role dropdown
  }

  toggleRoleDropdown(): void {
    this.showRoleDropdown = !this.showRoleDropdown;
    this.showStatusDropdown = false; // Close status dropdown
  }

  // Select filter methods
  selectStatus(status: string): void {
    this.selectedStatus = status;
    this.showStatusDropdown = false;
  }

  selectRole(role: string): void {
    this.selectedRole = role;
    this.showRoleDropdown = false;
  }

  // Filtered users getter
  get filteredUsers(): any[] {
    let filtered = this.users;

    // Filter by status
    if (this.selectedStatus !== 'Tous les status') {
      filtered = filtered.filter(user => user.status === this.selectedStatus);
    }

    // Filter by role
    if (this.selectedRole !== 'Tous les rôles') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    return filtered;
  }

  // Close dropdowns on outside click
  @HostListener('document:click', ['$event'])
  closeDropdownsOnClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown-container')) {
      this.showStatusDropdown = false;
      this.showRoleDropdown = false;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Actif':
        return 'text-[#16A34A] bg-[#0D823B0D]';
      case 'Inactif':
        return 'text-[#F87171] bg-red-50';
      case 'Suspendu':
        return 'text-yellow-700 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  getStatusDotColor(status: string): string {
    switch (status) {
      case 'Actif':
        return 'bg-[#0D823B]';
      case 'Inactif':
        return 'bg-[#F87171]';
      case 'Suspendu':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  }
  getRoleColor(role: string): string {
    switch (role) {
      case 'Client': return 'text-emerald-600 bg-[#16A34A0F]';
      case 'Agent': return 'text-gray-600 bg-gray-50';
      case 'Administrateur': return 'text-[#274B9B] bg-[#274B9B0F]';
      default: return 'text-gray-600 bg-gray-50';
    }
  }

  // Retourne un SVG pour chaque rôle (placeholder SVG)
  getRoleSvg(role: string): SafeHtml {
    let svg = '';

    switch (role) {
      case 'Client':
        // svg placeholder
        svg = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.33333 0C6.04058 0 6.71885 0.280951 7.21895 0.781048C7.71905 1.28115 8 1.95942 8 2.66667C8 3.37391 7.71905 4.05219 7.21895 4.55229C6.71885 5.05238 6.04058 5.33333 5.33333 5.33333C4.62609 5.33333 3.94781 5.05238 3.44772 4.55229C2.94762 4.05219 2.66667 3.37391 2.66667 2.66667C2.66667 1.95942 2.94762 1.28115 3.44772 0.781048C3.94781 0.280951 4.62609 0 5.33333 0ZM5.33333 1.33333C4.97971 1.33333 4.64057 1.47381 4.39052 1.72386C4.14048 1.97391 4 2.31304 4 2.66667C4 3.02029 4.14048 3.35943 4.39052 3.60948C4.64057 3.85952 4.97971 4 5.33333 4C5.68696 4 6.02609 3.85952 6.27614 3.60948C6.52619 3.35943 6.66667 3.02029 6.66667 2.66667C6.66667 2.31304 6.52619 1.97391 6.27614 1.72386C6.02609 1.47381 5.68696 1.33333 5.33333 1.33333ZM5.33333 6C7.11333 6 10.6667 6.88667 10.6667 8.66667V10.6667H0V8.66667C0 6.88667 3.55333 6 5.33333 6ZM5.33333 7.26667C3.35333 7.26667 1.26667 8.24 1.26667 8.66667V9.4H9.4V8.66667C9.4 8.24 7.31333 7.26667 5.33333 7.26667Z" fill="#16A34A"/>
          </svg>
          `;
        break;
      case 'Agent':
        // svg placeholder
        svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.66675 2.33341C5.70875 2.33341 4.94675 3.08741 4.94675 4.00008C4.94675 4.91275 5.70942 5.66675 6.66675 5.66675C7.62408 5.66675 8.38608 4.91275 8.38608 4.00008C8.38608 3.08741 7.62408 2.33341 6.66608 2.33341M4.28008 4.00008C4.28008 2.70341 5.35675 1.66675 6.66675 1.66675C7.97608 1.66675 9.05275 2.70341 9.05275 4.00008C9.05275 5.29675 7.97608 6.33342 6.66608 6.33342C5.35742 6.33342 4.28142 5.29675 4.28142 4.00008M5.07208 7.83741C4.92675 7.74408 4.78542 7.71741 4.68208 7.74541C4.58431 7.77208 4.48675 7.80097 4.38942 7.83208L3.73342 8.04275C3.48405 8.11982 3.25608 8.25394 3.06757 8.43447C2.87906 8.61499 2.73521 8.83695 2.64742 9.08275C2.62742 9.14275 2.61408 9.21208 2.60475 9.30075L2.34475 11.7641L2.34408 11.7701C2.28408 12.1941 2.51208 12.5534 2.89342 12.6421C3.62475 12.8114 4.84675 13.0001 6.66808 13.0001C6.75649 13.0001 6.84127 13.0352 6.90379 13.0977C6.9663 13.1602 7.00142 13.245 7.00142 13.3334C7.00142 13.4218 6.9663 13.5066 6.90379 13.5691C6.84127 13.6316 6.75649 13.6667 6.66808 13.6667C4.80142 13.6667 3.52808 13.4734 2.74275 13.2914C1.97808 13.1141 1.58475 12.3947 1.68275 11.6821L1.94208 9.23075C1.95342 9.12141 1.97275 8.99408 2.01742 8.86475C2.1391 8.52114 2.33915 8.21061 2.60171 7.95777C2.86428 7.70492 3.18214 7.51672 3.53008 7.40808L4.18608 7.19741C4.29186 7.16364 4.39808 7.13208 4.50475 7.10275C4.85142 7.00742 5.19008 7.12008 5.43408 7.27808C5.69675 7.44741 6.13075 7.65741 6.66742 7.65741C7.20408 7.65741 7.63875 7.44742 7.90142 7.27742C8.14608 7.12008 8.48408 7.00742 8.83075 7.10275C8.93742 7.13253 9.04364 7.16408 9.14942 7.19741L9.80608 7.40808C9.8488 7.42056 9.88859 7.44146 9.9231 7.46955C9.9576 7.49765 9.98614 7.53237 10.007 7.57167C10.0279 7.61097 10.0407 7.65405 10.0447 7.69838C10.0486 7.7427 10.0437 7.78737 10.0301 7.82975C10.0165 7.87213 9.99458 7.91136 9.9656 7.94513C9.93661 7.9789 9.90117 8.00653 9.86134 8.02638C9.82151 8.04623 9.77811 8.05791 9.7337 8.06072C9.68929 8.06353 9.64476 8.05742 9.60275 8.04275L8.94608 7.83275C8.84964 7.80164 8.75231 7.77275 8.65408 7.74608C8.55008 7.71742 8.40942 7.74341 8.26342 7.83741C7.93742 8.04875 7.37742 8.32408 6.66808 8.32408C5.95808 8.32408 5.39808 8.04875 5.07208 7.83741Z" fill="#333333"/>
          <path d="M10.4269 8.77327C10.4386 8.65233 10.495 8.54012 10.5852 8.4587C10.6754 8.37728 10.7928 8.33254 10.9143 8.33327H11.7523C11.8739 8.33237 11.9914 8.37704 12.0817 8.45848C12.172 8.53991 12.2286 8.65221 12.2403 8.77327C12.2523 8.91127 12.3583 9.0586 12.5489 9.15593C12.5863 9.17504 12.6234 9.19504 12.6603 9.21593C12.8696 9.33593 13.0743 9.35793 13.2223 9.29193C13.3315 9.24266 13.4549 9.23484 13.5695 9.26993C13.6841 9.30502 13.782 9.38061 13.8449 9.4826L14.2636 10.1706C14.328 10.2765 14.3487 10.4033 14.3212 10.5241C14.2936 10.645 14.2202 10.7504 14.1163 10.8179C13.9963 10.8966 13.9143 11.0699 13.9169 11.3013V11.3653C13.9136 11.5966 13.9969 11.7699 14.1163 11.8486C14.2202 11.9162 14.2936 12.0216 14.3212 12.1424C14.3487 12.2632 14.328 12.3901 14.2636 12.4959L13.8449 13.1839C13.782 13.2859 13.6841 13.3615 13.5695 13.3966C13.4549 13.4317 13.3315 13.4239 13.2223 13.3746C13.0743 13.3086 12.8696 13.3306 12.6603 13.4506C12.6238 13.471 12.5867 13.491 12.5489 13.5106C12.3583 13.6079 12.2523 13.7553 12.2403 13.8933C12.2286 14.0143 12.172 14.1266 12.0817 14.2081C11.9914 14.2895 11.8739 14.3342 11.7523 14.3333H10.9136C10.7921 14.334 10.6747 14.2892 10.5846 14.2078C10.4944 14.1264 10.4379 14.0142 10.4263 13.8933C10.4136 13.7553 10.3076 13.6079 10.1169 13.5106C10.0796 13.4915 10.0427 13.4715 10.0063 13.4506C9.79626 13.3306 9.5916 13.3086 9.4436 13.3746C9.33436 13.4239 9.21092 13.4317 9.09633 13.3966C8.98175 13.3615 8.88385 13.2859 8.82093 13.1839L8.40226 12.4959C8.33791 12.39 8.31737 12.2631 8.345 12.1423C8.37263 12.0214 8.44626 11.9161 8.55026 11.8486C8.67026 11.7699 8.75226 11.5966 8.74893 11.3653V11.3013C8.75226 11.0699 8.6696 10.8966 8.55026 10.8179C8.44626 10.7505 8.37263 10.6451 8.345 10.5243C8.31737 10.4034 8.33791 10.2766 8.40226 10.1706L8.82093 9.4826C8.88385 9.38061 8.98175 9.30502 9.09633 9.26993C9.21092 9.23484 9.33436 9.24266 9.4436 9.29193C9.5916 9.35793 9.79693 9.33593 10.0063 9.21593C10.0427 9.19549 10.0796 9.17549 10.1169 9.15593C10.3076 9.0586 10.4136 8.91127 10.4263 8.77327M11.0609 8.99993C10.9689 9.3506 10.7003 9.60727 10.4196 9.74993L10.3369 9.7946C10.0543 9.9566 9.68093 10.0579 9.3156 9.9526L9.05893 10.3739C9.32626 10.6286 9.4196 10.9966 9.4156 11.3099V11.3566C9.4196 11.6699 9.32626 12.0379 9.05893 12.2926L9.3156 12.7139C9.68093 12.6086 10.0543 12.7099 10.3369 12.8719C10.3636 12.887 10.3912 12.9019 10.4196 12.9166C10.6996 13.0593 10.9689 13.3166 11.0609 13.6666H11.6043C11.6963 13.3159 11.9656 13.0593 12.2456 12.9166L12.3283 12.8719C12.6109 12.7099 12.9849 12.6086 13.3503 12.7139L13.6063 12.2926C13.3389 12.0379 13.2456 11.6699 13.2496 11.3566V11.3099C13.2456 10.9966 13.3389 10.6286 13.6063 10.3739L13.3503 9.9526C12.9843 10.0579 12.6109 9.9566 12.3283 9.7946L12.2456 9.74993C11.9656 9.60727 11.6963 9.34993 11.6043 8.99993H11.0609ZM11.8603 11.0619C11.6976 10.7953 11.3229 10.6919 11.0236 10.8553C10.7343 11.0146 10.6503 11.3486 10.8049 11.6046C10.9676 11.8713 11.3423 11.9746 11.6416 11.8113C11.9309 11.6519 12.0149 11.3179 11.8603 11.0619ZM10.7036 10.2713C11.3016 9.94393 12.0736 10.1313 12.4296 10.7153C12.7923 11.3106 12.5689 12.0633 11.9616 12.3953C11.3636 12.7226 10.5916 12.5353 10.2356 11.9513C9.8736 11.3559 10.0963 10.6033 10.7036 10.2713Z" fill="#333333"/>
          </svg>
          `;
        break;
      case 'Administrateur':
        // svg placeholder
        svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.85714 0C0.832 0 1.70864e-08 0.832 1.70864e-08 1.85714V4.91429C-0.000127114 7.16903 0.709185 9.36666 2.02746 11.1959C3.34573 13.0251 5.20614 14.3932 7.34514 15.1063C7.49194 15.1558 7.65091 15.1558 7.79771 15.1063C9.93672 14.3932 11.7971 13.0251 13.1154 11.1959C14.4337 9.36666 15.143 7.16903 15.1429 4.91429V1.85714C15.1429 0.832 14.312 0 13.2857 0H1.85714ZM1.42857 1.85714C1.42857 1.62057 1.62057 1.42857 1.85714 1.42857H13.2857C13.5223 1.42857 13.7143 1.62057 13.7143 1.85714V4.91429C13.7148 6.90308 13.0779 8.83968 11.8971 10.44C10.7307 9.3301 9.18156 8.71208 7.57143 8.71429C5.89486 8.71429 4.37143 9.37143 3.24457 10.44C2.06418 8.83954 1.42773 6.90295 1.42857 4.91429V1.85714ZM7.57143 3.57143C7.15466 3.57143 6.75496 3.73699 6.46026 4.03169C6.16556 4.32639 6 4.72609 6 5.14286C6 5.55963 6.16556 5.95933 6.46026 6.25403C6.75496 6.54873 7.15466 6.71429 7.57143 6.71429C7.9882 6.71429 8.3879 6.54873 8.6826 6.25403C8.9773 5.95933 9.14286 5.55963 9.14286 5.14286C9.14286 4.72609 8.9773 4.32639 8.6826 4.03169C8.3879 3.73699 7.9882 3.57143 7.57143 3.57143ZM4.57143 5.14286C4.57143 4.34721 4.8875 3.58415 5.45011 3.02154C6.01272 2.45893 6.77578 2.14286 7.57143 2.14286C8.36708 2.14286 9.13014 2.45893 9.69275 3.02154C10.2554 3.58415 10.5714 4.34721 10.5714 5.14286C10.5714 5.93851 10.2554 6.70157 9.69275 7.26418C9.13014 7.82679 8.36708 8.14286 7.57143 8.14286C6.77578 8.14286 6.01272 7.82679 5.45011 7.26418C4.8875 6.70157 4.57143 5.93851 4.57143 5.14286Z" fill="#274B9B"/>
          </svg>
          `;
        break;
      default:
        // svg placeholder
        svg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="7" r="4" fill="#6B7280"/><rect x="3" y="13" width="14" height="5" rx="2.5" fill="#6B7280" opacity="0.2"/></svg>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}