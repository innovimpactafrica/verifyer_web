import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
// Local mock types and data (no external service)
type RoleType = 'Client' | 'Agent' | 'Administrateur' | string;
type StatusType = 'Actif' | 'Inactif' | 'Suspendu' | string;

export interface UserItem {
    id: string;
    initials: string;
    name: string;
    email: string;
    role: RoleType;
    lastActivity: string;
    status: StatusType;
    phone?: string;
}

@Component({
    selector: 'app-utilisateur-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, AdminSidebarComponent],
    templateUrl: './utilisateur-detail.component.html',
    styleUrls: ['./utilisateur-detail.component.css']
})
export class UtilisateurDetailComponent implements OnInit, OnDestroy {
    userId = '';
    user?: UserItem;

    private sub: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe((params) => {
            const raw = params.get('id') ?? '';
            // id may be encoded because of '#'
            this.userId = decodeURIComponent(raw);
            const users: UserItem[] = [
                {
                    id: '#0004',
                    initials: 'AS',
                    name: 'Aminata Sow',
                    email: 'aminata.sow@mail.com',
                    role: 'Client',
                    lastActivity: '2025-09-24 10:15',
                    status: 'Actif',
                    phone: '+221 77 123 45 67',
                },
                {
                    id: '#0003',
                    initials: 'BT',
                    name: 'Boubacar Touré',
                    email: 'b.toure@mail.com',
                    role: 'Agent',
                    lastActivity: '2025-09-25 16:02',
                    status: 'Actif',
                    phone: '+221 77 222 33 44',
                },
                {
                    id: '#0002',
                    initials: 'FD',
                    name: 'Fatou Diop',
                    email: 'fatou.diop@mail.com',
                    role: 'Client',
                    lastActivity: '--',
                    status: 'Inactif',
                    phone: '+221 77 555 66 77',
                },
                {
                    id: '#0001',
                    initials: 'GK',
                    name: 'Gerald Keita',
                    email: 'gerald.keita@mail.com',
                    role: 'Administrateur',
                    lastActivity: '2025-09-26 09:10',
                    status: 'Actif',
                    phone: '+221 77 999 00 11',
                },
            ];
            this.user = users.find(u => u.id === this.userId);
            // Prefill edit model when user loads
            if (this.user) {
                this.editModel = {
                    name: this.user.name,
                    email: this.user.email,
                    role: this.user.role,
                };
                // very light parsing for phone: try to strip country code prefix
                const full = this.user.phone || '';
                if (full.startsWith(this.selectedCountry.code + ' ')) {
                    this.phone = full.substring((this.selectedCountry.code + ' ').length);
                } else {
                    this.phone = full.replace(/^\+?[0-9]+\s*/, '');
                }
            }
        });
    }

    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }

    // Helpers copied from list to keep consistent badge styles
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

    // Modal: edit user (style mirrors create-user modal)
    showEditModal = false;
    phone: string = '';
    showCountryDropdown: boolean = false;
    selectedCountry = { code: '+221', name: 'Sénégal', flag: '🇸🇳' };
    countries = [
        { code: '+221', name: 'Sénégal', flag: '🇸🇳' },
        { code: '+33', name: 'France', flag: '🇫🇷' },
        { code: '+1', name: 'États-Unis', flag: '🇺🇸' },
        { code: '+44', name: 'Royaume-Uni', flag: '🇬🇧' },
        { code: "+225", name: "Côte d'Ivoire", flag: '🇨🇮' },
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

    editModel: { name: string; email: string; role: string } = { name: '', email: '', role: '' };

    openEditModal() {
        this.showEditModal = true;
    }
    closeEditModal() {
        this.showEditModal = false;
        this.showCountryDropdown = false;
    }
    onModalBackdropClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.classList.contains('modal-backdrop')) {
            this.closeEditModal();
        }
    }
    toggleCountryDropdown(): void {
        this.showCountryDropdown = !this.showCountryDropdown;
    }
    selectCountry(country: any): void {
        this.selectedCountry = country;
        this.showCountryDropdown = false;
    }
}
