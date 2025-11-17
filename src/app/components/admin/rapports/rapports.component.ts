import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'app-rapports',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminSidebarComponent],
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent {
  constructor(private sanitizer: DomSanitizer) { }
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
      iconColor: 'text-emerald-600 bg-[#0D823B0D]',
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
      iconColor: 'text-purple-600 bg-[#6F42C10F]',
      zone: 'Dakar',
      agent: 'Penda Faye',
      client: 'Fatou Diop',
      date: '05/12/2022',
      status: 'Validé',
      statusColor: 'text-emerald-600 bg-[#0D823B0D]'
    },
    {
      id: 'RPT-2025-001',
      name: 'Atelier Fama',
      type: 'Atelier',
      icon: 'tools',
      iconColor: 'text-blue-600 bg-[#274B9B14]',
      zone: 'Saint-Louis',
      agent: 'Moussa Seck',
      client: 'Boubacar Touré',
      date: '15/08/2022',
      status: 'Rejeté',
      statusColor: 'text-[#F87171] bg-red-50'
    }
  ];

  currentPage = 1;
  totalPages = 10;

  // Filter properties
  selectedZone: string = 'Tous les zones';
  selectedType: string = 'Toutes les types';
  selectedStatus: string = 'Tous les statuts';
  showZoneDropdown: boolean = false;
  showTypeDropdown: boolean = false;
  showStatusDropdown: boolean = false;

  zoneOptions: string[] = ['Tous les zones', 'Dakar', 'Thiès', 'Saint-Louis'];
  typeOptions: string[] = ['Toutes les types', 'Immeuble', 'Hôtel', 'Restaurant', 'Atelier'];
  statusOptions: string[] = ['Tous les statuts', 'En attente de validation', 'Validé', 'Rejeté'];

  // Toggle dropdown methods
  toggleZoneDropdown(): void {
    this.showZoneDropdown = !this.showZoneDropdown;
    this.showTypeDropdown = false;
    this.showStatusDropdown = false;
  }

  toggleTypeDropdown(): void {
    this.showTypeDropdown = !this.showTypeDropdown;
    this.showZoneDropdown = false;
    this.showStatusDropdown = false;
  }

  toggleStatusDropdown(): void {
    this.showStatusDropdown = !this.showStatusDropdown;
    this.showZoneDropdown = false;
    this.showTypeDropdown = false;
  }

  // Select filter methods
  selectZone(zone: string): void {
    this.selectedZone = zone;
    this.showZoneDropdown = false;
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.showTypeDropdown = false;
  }

  selectStatus(status: string): void {
    this.selectedStatus = status;
    this.showStatusDropdown = false;
  }

  // Filtered rapports getter
  get filteredRapports(): any[] {
    let filtered = this.rapports;

    // Filter by zone
    if (this.selectedZone !== 'Tous les zones') {
      filtered = filtered.filter(rapport => rapport.zone === this.selectedZone);
    }

    // Filter by type
    if (this.selectedType !== 'Toutes les types') {
      filtered = filtered.filter(rapport => rapport.type === this.selectedType);
    }

    // Filter by status
    if (this.selectedStatus !== 'Tous les statuts') {
      filtered = filtered.filter(rapport => rapport.status === this.selectedStatus);
    }

    return filtered;
  }

  // Close dropdowns on outside click
  @HostListener('document:click', ['$event'])
  closeDropdownsOnClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown-container')) {
      this.showZoneDropdown = false;
      this.showTypeDropdown = false;
      this.showStatusDropdown = false;
    }
  }

  // Logique d'affichage des icônes pour la colonne Bien (similaire à utilisateurs/missions)
  getBienColor(type: string): string {
    switch (type) {
      case 'Immeuble':
        return 'text-emerald-600 bg-[#0D823B0D]';
      case 'Hôtel':
        return 'text-orange-600 bg-orange-50';
      case 'Restaurant':
        return 'text-purple-600 bg-[#6F42C10F]';
      case 'Atelier':
        return 'text-blue-600 bg-[#274B9B14]';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  getBienSvg(type: string): SafeHtml {
    let svg = '';
    switch (type) {
      case 'Immeuble':
        svg = `<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.75 19.7501H0.75M0.75 8.7501L8.876 2.2501C9.40793 1.82459 10.0688 1.59277 10.75 1.59277C11.4312 1.59277 12.0921 1.82459 12.624 2.2501L20.75 8.7501" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round"/>
                <path opacity="0.5" d="M14.25 3.25V1.25C14.25 1.11739 14.3027 0.990215 14.3964 0.896447C14.4902 0.802679 14.6174 0.75 14.75 0.75H17.25C17.3826 0.75 17.5098 0.802679 17.6036 0.896447C17.6973 0.990215 17.75 1.11739 17.75 1.25V6.25" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M2.75 19.75V7.25M18.75 19.75V7.25" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round"/>
                <path opacity="0.5" d="M13.75 19.75V14.75C13.75 13.336 13.75 12.629 13.31 12.19C12.872 11.75 12.165 11.75 10.75 11.75C9.335 11.75 8.629 11.75 8.19 12.19C7.75 12.628 7.75 13.335 7.75 14.75V19.75M12.75 7.25C12.75 7.78043 12.5393 8.28914 12.1642 8.66421C11.7891 9.03929 11.2804 9.25 10.75 9.25C10.2196 9.25 9.71086 9.03929 9.33579 8.66421C8.96071 8.28914 8.75 7.78043 8.75 7.25C8.75 6.71957 8.96071 6.21086 9.33579 5.83579C9.71086 5.46071 10.2196 5.25 10.75 5.25C11.2804 5.25 11.7891 5.46071 12.1642 5.83579C12.5393 6.21086 12.75 6.71957 12.75 7.25Z" stroke="#0D823B" stroke-width="1.5"/>
              </svg>`;
        break;
      case 'Hôtel':
        // svg placeholder
        svg = `<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 15V0H2V10H10V2H18C19.1 2 20.0417 2.39167 20.825 3.175C21.6083 3.95833 22 4.9 22 6V15H20V12H2V15H0ZM6 9C5.16667 9 4.45833 8.70833 3.875 8.125C3.29167 7.54167 3 6.83333 3 6C3 5.16667 3.29167 4.45833 3.875 3.875C4.45833 3.29167 5.16667 3 6 3C6.83333 3 7.54167 3.29167 8.125 3.875C8.70833 4.45833 9 5.16667 9 6C9 6.83333 8.70833 7.54167 8.125 8.125C7.54167 8.70833 6.83333 9 6 9ZM12 10H20V6C20 5.45 19.8043 4.97933 19.413 4.588C19.0217 4.19667 18.5507 4.00067 18 4H12V10ZM6 7C6.28333 7 6.521 6.904 6.713 6.712C6.905 6.52 7.00067 6.28267 7 6C6.99933 5.71733 6.90333 5.48 6.712 5.288C6.52067 5.096 6.28333 5 6 5C5.71667 5 5.47933 5.096 5.288 5.288C5.09667 5.48 5.00067 5.71733 5 6C4.99933 6.28267 5.09533 6.52033 5.288 6.713C5.48067 6.90567 5.718 7.00133 6 7Z" fill="#FD7E14" />
              </svg>`;
        break;
      case 'Restaurant':
        // svg placeholder
        svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_93_4230)">
                   <path d="M1.79655 1.49194L13.31 13.0054C13.5285 13.2239 13.6512 13.5202 13.6512 13.8291C13.6512 14.1381 13.5285 14.4344 13.31 14.6529C13.0915 14.8713 12.7952 14.9939 12.4862 14.9939C12.1773 14.9939 11.881 14.8713 11.6625 14.6529L8.84999 11.7919C8.66594 11.605 8.56268 11.3533 8.56249 11.091V10.9182C8.56252 10.7857 8.53623 10.6546 8.48516 10.5324C8.43409 10.4102 8.35925 10.2994 8.26499 10.2063L7.90187 9.87101C7.7786 9.75726 7.62869 9.67635 7.46596 9.63572C7.30323 9.59509 7.13288 9.59605 6.97062 9.63851C6.71473 9.70529 6.44583 9.704 6.1906 9.63476C5.93537 9.56553 5.70268 9.43076 5.51562 9.24382L2.84593 6.57382C1.26218 4.99007 0.679367 2.59851 1.79655 1.49194Z" stroke="#6F42C1" stroke-linejoin="round" />
                   <path d="M12.5 1L10.0859 3.41406C9.90018 3.59979 9.75282 3.82029 9.65229 4.06297C9.55175 4.30565 9.50001 4.56576 9.50001 4.82844V5.29281C9.50002 5.35851 9.48708 5.42357 9.46193 5.48427C9.43678 5.54497 9.39992 5.60012 9.35345 5.64656L9.00001 6M10 7L10.3534 6.64656C10.3999 6.60009 10.455 6.56322 10.5157 6.53808C10.5764 6.51293 10.6415 6.49999 10.7072 6.5H11.1716C11.4343 6.5 11.6944 6.44826 11.937 6.34772C12.1797 6.24718 12.4002 6.09983 12.5859 5.91406L15 3.5M13.75 2.25L11.25 4.75M6.25001 11.5L3.13376 14.6337C2.89935 14.8681 2.58146 14.9997 2.25001 14.9997C1.91855 14.9997 1.60067 14.8681 1.36626 14.6337C1.13192 14.3993 1.00027 14.0815 1.00027 13.75C1.00027 13.4185 1.13192 13.1007 1.36626 12.8663L4.00001 10.25" stroke="#6F42C1" stroke-linecap="round" stroke-linejoin="round" />
                </g>
               <defs>
                   <clipPath id="clip0_93_4230">
                       <rect width="16" height="16" fill="white" />
                   </clipPath>
               </defs>
              </svg>`;
        break;
      case 'Atelier':
        // svg placeholder
        svg = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0.737625 8.57304e-05C0.725082 -0.000103941 0.712537 2.11305e-05 0.7 0.000460763C0.5535 0.00536701 0.452687 0.0546482 0.383969 0.123367C0.292344 0.214992 0.235219 0.363648 0.271844 0.601648C0.308531 0.839648 0.449438 1.15646 0.749094 1.50605C2.87078 3.98137 4.90331 6.3673 6.48981 8.13012C6.87334 8.55624 7.23022 8.94509 7.55622 9.29056C7.93419 8.29362 8.63653 7.59855 9.52191 7.26821C9.18362 6.94949 8.80516 6.60218 8.39075 6.22921C6.628 4.64271 4.242 2.61012 1.76672 0.488429C1.41716 0.188742 1.10031 0.047867 0.862313 0.0111795C0.821044 0.00470782 0.779388 0.00100159 0.737625 8.57304e-05ZM12.4598 0.0326795C12.4502 0.0325754 12.441 0.0328149 12.4324 0.0333982C12.3633 0.037992 12.3281 0.0538358 12.2894 0.092492L11.4276 0.954367L13.1512 2.67793L14.013 1.81605C14.0517 1.77743 14.0675 1.74224 14.0721 1.67312C14.0768 1.60405 14.0605 1.5033 14.0157 1.38674C13.926 1.15362 13.7258 0.865898 13.4827 0.622836C13.2397 0.379773 12.9519 0.179555 12.7188 0.089867C12.6168 0.0506483 12.527 0.0333045 12.4598 0.0326795H12.4598ZM11.0298 1.35205L10.7205 1.66146L11.0298 1.97077L11.4276 2.36855L11.7369 2.67787L12.1347 3.07565L12.444 3.38502L12.7534 3.07565L11.0298 1.35205ZM10.3228 2.05918L7.59184 4.79012L7.91894 5.08174L10.6321 2.36855L10.3228 2.05918ZM11.0298 2.76634L8.33947 5.45665L8.66662 5.74824L11.3392 3.07565L11.0298 2.76634ZM11.737 3.47334L9.08716 6.12318L9.41431 6.4148L12.0464 3.78274L11.7371 3.47337H11.737V3.47334ZM5.05397 7.32802L1.30719 11.0749L1.6165 11.3842L5.34594 7.65474L5.05397 7.32802ZM9.98084 7.70762C9.02894 7.94596 8.31709 8.61962 7.99309 9.74568C8.16972 9.92646 8.33547 10.0921 8.48622 10.2365C8.72309 10.4635 8.92672 10.643 9.08653 10.7664C9.14206 10.2281 9.40044 9.73324 9.76294 9.36984C10.0942 9.03771 10.5284 8.80715 10.9856 8.77321C10.8647 8.62209 10.7 8.43727 10.4972 8.22562C10.346 8.0679 10.1717 7.89365 9.98084 7.70762ZM5.72137 8.07474L2.01422 11.7818L2.32359 12.0913L6.01344 8.40146L5.72137 8.07474ZM6.38891 8.82143L2.72137 12.489L3.03063 12.7983L6.68094 9.14815L6.38891 8.82143ZM11.0856 9.33102C10.7607 9.3353 10.4315 9.49602 10.1611 9.76712C9.80059 10.1285 9.57756 10.6687 9.65278 11.1953C9.81947 12.3622 10.395 13.2518 11.1984 13.7339C11.9087 14.16 12.8063 14.2761 13.8123 13.9521C13.0553 13.8268 12.3599 12.9926 12.3061 12.3693C12.6383 12.7698 13.0542 13.1364 13.5069 13.3615C13.1981 12.656 13.2194 11.9411 13.1604 11.3515C13.1182 10.9289 13.0388 10.5708 12.8049 10.2526C12.5709 9.93452 12.1667 9.6339 11.4067 9.38059C11.3032 9.3461 11.1947 9.32934 11.0856 9.33102ZM1.01213 11.5753L1.01203 11.5753L1.01209 11.5754L1.01213 11.5753ZM1.01209 11.5754L0.633438 12.5223L1.58319 13.4721L2.53022 13.0934L2.32366 12.8867L1.92578 12.489L1.61647 12.1797L1.21866 11.782L1.01209 11.5754ZM0.406 13.0906L0 14.1054L1.01494 13.6994L0.406 13.0906Z" fill="#274B9B" />
               </svg>`;
        break;
      default:
        svg = `<svg width='20' height='20'><circle cx='10' cy='10' r='8' fill='#e5e7eb'/></svg>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}