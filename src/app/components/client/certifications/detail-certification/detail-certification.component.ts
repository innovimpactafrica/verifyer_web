import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientSidebarComponent } from '../../client-sidebar/client-sidebar.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-detail-certification',
    standalone: true,
    imports: [CommonModule, RouterModule, ClientSidebarComponent],
    templateUrl: './detail-certification.component.html',
    styleUrl: './detail-certification.component.css'
})
export class DetailCertificationComponent implements OnInit {
    certificationId: string = '';
    certificationDetails: any = null;

    // Données simulées des certifications (même structure que mes-certifications)
    private certifications = [
        {
            id: 'CERT-006',
            reference: 'CERT-006',
            nom: 'Appartement A',
            type: 'Immobilier',
            statut: 'Valide',
            score: 92,
            scoreLabel: 'Excellent',
            client: 'Aminata Sow',
            adresse: 'Sicap, Rue 12',
            zone: 'Dakar',
            facture: 'FAC-2025-001',
            agent: 'Ibrahima Ndiaye',
            dureeValidite: '6 mois',
            dateEmission: '15/05/2023',
            dateExpiration: '15/05/2024',
            validite: '15/05/2023 - 15/05/2024',
            dateSubmission: '2023-05-10',
            historiques: [
                {
                    type: 'status',
                    label: 'Statut mis à "Valide"',
                    date: '15/05/2023 10:30'
                },
                {
                    type: 'payment',
                    label: 'Paiement reçu',
                    date: '10/05/2023 14:20'
                },
                {
                    type: 'status',
                    label: 'Demande soumise',
                    date: '05/05/2023 09:15'
                }
            ],
            documents: [
                {
                    nom: 'Certificat de conformité',
                    taille: '209 ko',
                    type: 'pdf'
                },
                {
                    nom: 'Rapport technique',
                    taille: '902 ko',
                    type: 'excel'
                }
            ]
        },
        {
            id: 'CERT-005',
            reference: 'CERT-005',
            nom: 'Villa A',
            type: 'Immobilier',
            statut: 'Valide',
            score: 88,
            scoreLabel: 'Excellent',
            client: 'Moussa Diop',
            adresse: 'Almadies, Dakar',
            zone: 'Dakar',
            facture: 'FAC-2024-892',
            agent: 'Fatou Sall',
            dureeValidite: '6 mois',
            dateEmission: '10/03/2023',
            dateExpiration: '10/03/2024',
            validite: '10/03/2023 - 10/03/2024',
            dateSubmission: '2023-03-05',
            historiques: [
                {
                    type: 'status',
                    label: 'Statut mis à "Valide"',
                    date: '10/03/2023 11:45'
                },
                {
                    type: 'payment',
                    label: 'Paiement reçu',
                    date: '08/03/2023 16:30'
                },
                {
                    type: 'status',
                    label: 'Demande soumise',
                    date: '05/03/2023 08:00'
                }
            ],
            documents: [
                {
                    nom: 'Certificat immobilier',
                    taille: '256 ko',
                    type: 'pdf'
                },
                {
                    nom: 'Plan architectural',
                    taille: '1.5 Mo',
                    type: 'pdf'
                }
            ]
        },
        {
            id: 'CERT-003',
            reference: 'CERT-003',
            nom: 'Restaurant Le Saloum',
            type: 'Restaurant',
            statut: 'En renouvellement',
            score: 84,
            scoreLabel: 'Bien',
            client: 'Cheikh Sy',
            adresse: 'Plateau, Dakar',
            zone: 'Dakar',
            facture: 'FAC-2024-654',
            agent: 'Aminata Ba',
            dureeValidite: '6 mois',
            dateEmission: '05/12/2022',
            dateExpiration: '05/12/2023',
            validite: '05/12/2022 - 05/12/2023',
            dateSubmission: '2022-12-01',
            historiques: [
                {
                    type: 'status',
                    label: 'Demande de renouvellement initiée',
                    date: '05/11/2023 14:20'
                },
                {
                    type: 'status',
                    label: 'Statut mis à "Valide"',
                    date: '05/12/2022 09:15'
                },
                {
                    type: 'payment',
                    label: 'Paiement reçu',
                    date: '03/12/2022 10:45'
                }
            ],
            documents: [
                {
                    nom: 'Certificat sanitaire',
                    taille: '156 ko',
                    type: 'pdf'
                },
                {
                    nom: 'Plan de cuisine',
                    taille: '1.2 Mo',
                    type: 'pdf'
                }
            ]
        },
        {
            id: 'CERT-002',
            reference: 'CERT-002',
            nom: 'Hôtel du Parc',
            type: 'Hôtel',
            statut: 'En renouvellement',
            score: 90,
            scoreLabel: 'Excellent',
            client: 'Ibrahima Ndiaye',
            adresse: 'Point E, Dakar',
            zone: 'Dakar',
            facture: 'FAC-2023-321',
            agent: 'Ousmane Fall',
            dureeValidite: '6 mois',
            dateEmission: '20/10/2022',
            dateExpiration: '20/10/2023',
            validite: '20/10/2022 - 20/10/2023',
            dateSubmission: '2022-10-15',
            historiques: [
                {
                    type: 'status',
                    label: 'Demande de renouvellement initiée',
                    date: '20/09/2023 14:20'
                },
                {
                    type: 'status',
                    label: 'Statut mis à "Valide"',
                    date: '20/10/2022 13:30'
                },
                {
                    type: 'payment',
                    label: 'Paiement reçu',
                    date: '18/10/2022 11:20'
                }
            ],
            documents: [
                {
                    nom: 'Certificat de conformité hôtelière',
                    taille: '345 ko',
                    type: 'pdf'
                },
                {
                    nom: 'Normes de sécurité',
                    taille: '678 ko',
                    type: 'excel'
                }
            ]
        },
        {
            id: 'CERT-001',
            reference: 'CERT-001',
            nom: 'Menuiserie Ndiambour',
            type: 'Artisan',
            statut: 'Expiré',
            score: 78,
            scoreLabel: 'Bien',
            client: 'Aïssatou Diallo',
            adresse: 'Thiès',
            zone: 'Thiès',
            facture: 'FAC-2023-198',
            agent: 'Mamadou Sarr',
            dureeValidite: '6 mois',
            dateEmission: '15/08/2022',
            dateExpiration: '15/08/2023',
            validite: '15/08/2022 - 15/08/2023',
            dateSubmission: '2022-08-10',
            historiques: [
                {
                    type: 'status',
                    label: 'Certificat expiré',
                    date: '15/08/2023 00:00'
                },
                {
                    type: 'status',
                    label: 'Statut mis à "Valide"',
                    date: '15/08/2022 15:45'
                },
                {
                    type: 'payment',
                    label: 'Paiement reçu',
                    date: '12/08/2022 09:30'
                }
            ],
            documents: [
                {
                    nom: 'Certificat artisanal',
                    taille: '198 ko',
                    type: 'pdf'
                }
            ]
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        // Récupérer l'ID depuis l'URL
        this.route.paramMap.subscribe(params => {
            this.certificationId = params.get('id') || '';
            this.loadCertificationDetails();
        });
    }

    loadCertificationDetails(): void {
        // Charger les détails de la certification selon l'ID
        this.certificationDetails = this.certifications.find(c => c.id === this.certificationId);

        if (!this.certificationDetails) {
            console.warn(`Certification ${this.certificationId} introuvable`);
        }
    }

    getStatutClass(statut: string): string {
        switch (statut) {
            case 'Valide':
                return 'bg-[#0D823B0F] text-[#0D823B]';
            case 'En renouvellement':
                return 'bg-[#D6AB170F] text-[#D6AB17]';
            case 'Expiré':
                return 'bg-[#F543510F] text-[#F54351]';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    }

    goBack(): void {
        this.router.navigate(['/mes-certifications']);
    }

    getIconBgClass(type: string): string {
        switch (type) {
            case 'Immeuble':
            case 'Immobilier':
                return 'bg-[#0D823B0D]';
            case 'Restaurant':
                return 'bg-[#6F42C10F]';
            case 'Hôtel':
                return 'bg-[#FD7E140F]';
            case 'Artisan':
                return 'bg-[#274B9B14]';
            default:
                return 'bg-gray-100';
        }
    }

    getIconSvg(type: string): SafeHtml {
        let svg = '';

        switch (type) {
            case 'Immeuble':
            case 'Immobilier':
                svg = `<svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.9375 24.6879H0.937531M0.937531 10.9379L11.095 2.81287C11.7599 2.28098 12.5861 1.99121 13.4375 1.99121C14.289 1.99121 15.1151 2.28098 15.78 2.81287L25.9375 10.9379" stroke="#0D823B" stroke-width="1.875" stroke-linecap="round"/>
          <path opacity="0.5" d="M17.8125 4.0625V1.5625C17.8125 1.39674 17.8784 1.23777 17.9956 1.12056C18.1128 1.00335 18.2718 0.9375 18.4375 0.9375H21.5625C21.7283 0.9375 21.8873 1.00335 22.0045 1.12056C22.1217 1.23777 22.1875 1.39674 22.1875 1.5625V7.8125" stroke="#0D823B" stroke-width="1.875" stroke-linecap="round"/>
          <path d="M3.43753 24.6875V9.0625M23.4375 24.6875V9.0625" stroke="#0D823B" stroke-width="1.875" stroke-linecap="round"/>
          <path opacity="0.5" d="M17.1875 24.6875V18.4375C17.1875 16.67 17.1875 15.7862 16.6375 15.2375C16.09 14.6875 15.2063 14.6875 13.4375 14.6875C11.6688 14.6875 10.7863 14.6875 10.2375 15.2375C9.68753 15.785 9.68753 16.6688 9.68753 18.4375V24.6875M15.9375 9.0625C15.9375 9.72554 15.6741 10.3614 15.2053 10.8303C14.7365 11.2991 14.1006 11.5625 13.4375 11.5625C12.7745 11.5625 12.1386 11.2991 11.6698 10.8303C11.2009 10.3614 10.9375 9.72554 10.9375 9.0625C10.9375 8.39946 11.2009 7.76357 11.6698 7.29473C12.1386 6.82589 12.7745 6.5625 13.4375 6.5625C14.1006 6.5625 14.7365 6.82589 15.2053 7.29473C15.6741 7.76357 15.9375 8.39946 15.9375 9.0625Z" stroke="#0D823B" stroke-width="1.875"/>
        </svg>`;
                break;
            case 'Restaurant':
                svg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_93_4230)">
            <path d="M1.79655 1.49194L13.31 13.0054C13.5285 13.2239 13.6512 13.5202 13.6512 13.8291C13.6512 14.1381 13.5285 14.4344 13.31 14.6529C13.0915 14.8713 12.7952 14.9939 12.4862 14.9939C12.1773 14.9939 11.881 14.8713 11.6625 14.6529L8.84999 11.7919C8.66594 11.605 8.56268 11.3533 8.56249 11.091V10.9182C8.56252 10.7857 8.53623 10.6546 8.48516 10.5324C8.43409 10.4102 8.35925 10.2994 8.26499 10.2063L7.90187 9.87101C7.7786 9.75726 7.62869 9.67635 7.46596 9.63572C7.30323 9.59509 7.13288 9.59605 6.97062 9.63851C6.71473 9.70529 6.44583 9.704 6.1906 9.63476C5.93537 9.56553 5.70268 9.43076 5.51562 9.24382L2.84593 6.57382C1.26218 4.99007 0.679367 2.59851 1.79655 1.49194Z" stroke="#6F42C1" stroke-linejoin="round"/>
            <path d="M12.5 1L10.0859 3.41406C9.90018 3.59979 9.75282 3.82029 9.65229 4.06297C9.55175 4.30565 9.50001 4.56576 9.50001 4.82844V5.29281C9.50002 5.35851 9.48708 5.42357 9.46193 5.48427C9.43678 5.54497 9.39992 5.60012 9.35345 5.64656L9.00001 6M10 7L10.3534 6.64656C10.3999 6.60009 10.455 6.56322 10.5157 6.53808C10.5764 6.51293 10.6415 6.49999 10.7072 6.5H11.1716C11.4343 6.5 11.6944 6.44826 11.937 6.34772C12.1797 6.24718 12.4002 6.09983 12.5859 5.91406L15 3.5M13.75 2.25L11.25 4.75M6.25001 11.5L3.13376 14.6337C2.89935 14.8681 2.58146 14.9997 2.25001 14.9997C1.91855 14.9997 1.60067 14.8681 1.36626 14.6337C1.13192 14.3993 1.00027 14.0815 1.00027 13.75C1.00027 13.4185 1.13192 13.1007 1.36626 12.8663L4.00001 10.25" stroke="#6F42C1" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs><clipPath id="clip0_93_4230"><rect width="16" height="16" fill="white"/></clipPath></defs>
        </svg>`;
                break;
            case 'Hôtel':
                svg = `<svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 15V0H2V10H10V2H18C19.1 2 20.0417 2.39167 20.825 3.175C21.6083 3.95833 22 4.9 22 6V15H20V12H2V15H0ZM6 9C5.16667 9 4.45833 8.70833 3.875 8.125C3.29167 7.54167 3 6.83333 3 6C3 5.16667 3.29167 4.45833 3.875 3.875C4.45833 3.29167 5.16667 3 6 3C6.83333 3 7.54167 3.29167 8.125 3.875C8.70833 4.45833 9 5.16667 9 6C9 6.83333 8.70833 7.54167 8.125 8.125C7.54167 8.70833 6.83333 9 6 9ZM12 10H20V6C20 5.45 19.8043 4.97933 19.413 4.588C19.0217 4.19667 18.5507 4.00067 18 4H12V10ZM6 7C6.28333 7 6.521 6.904 6.713 6.712C6.905 6.52 7.00067 6.28267 7 6C6.99933 5.71733 6.90333 5.48 6.712 5.288C6.52067 5.096 6.28333 5 6 5C5.71667 5 5.47933 5.096 5.288 5.288C5.09667 5.48 5.00067 5.71733 5 6C4.99933 6.28267 5.09533 6.52033 5.288 6.713C5.48067 6.90567 5.718 7.00133 6 7Z" fill="#FD7E14"/>
        </svg>`;
                break;
            case 'Artisan':
                svg = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.737625 8.57304e-05C0.725082 -0.000103941 0.712537 2.11305e-05 0.7 0.000460763C0.5535 0.00536701 0.452687 0.0546482 0.383969 0.123367C0.292344 0.214992 0.235219 0.363648 0.271844 0.601648C0.308531 0.839648 0.449438 1.15646 0.749094 1.50605C2.87078 3.98137 4.90331 6.3673 6.48981 8.13012C6.87334 8.55624 7.23022 8.94509 7.55622 9.29056C7.93419 8.29362 8.63653 7.59855 9.52191 7.26821C9.18362 6.94949 8.80516 6.60218 8.39075 6.22921C6.628 4.64271 4.242 2.61012 1.76672 0.488429C1.41716 0.188742 1.10031 0.047867 0.862313 0.0111795C0.821044 0.00470782 0.779388 0.00100159 0.737625 8.57304e-05ZM12.4598 0.0326795C12.4502 0.0325754 12.441 0.0328149 12.4324 0.0333982C12.3633 0.037992 12.3281 0.0538358 12.2894 0.092492L11.4276 0.954367L13.1512 2.67793L14.013 1.81605C14.0517 1.77743 14.0675 1.74224 14.0721 1.67312C14.0768 1.60405 14.0605 1.5033 14.0157 1.38674C13.926 1.15362 13.7258 0.865898 13.4827 0.622836C13.2397 0.379773 12.9519 0.179555 12.7188 0.089867C12.6168 0.0506483 12.527 0.0333045 12.4598 0.0326795H12.4598ZM11.0298 1.35205L10.7205 1.66146L11.0298 1.97077L11.4276 2.36855L11.7369 2.67787L12.1347 3.07565L12.444 3.38502L12.7534 3.07565L11.0298 1.35205ZM10.3228 2.05918L7.59184 4.79012L7.91894 5.08174L10.6321 2.36855L10.3228 2.05918ZM11.0298 2.76634L8.33947 5.45665L8.66662 5.74824L11.3392 3.07565L11.0298 2.76634ZM11.737 3.47334L9.08716 6.12318L9.41431 6.4148L12.0464 3.78274L11.7371 3.47337H11.737V3.47334ZM5.05397 7.32802L1.30719 11.0749L1.6165 11.3842L5.34594 7.65474L5.05397 7.32802ZM9.98084 7.70762C9.02894 7.94596 8.31709 8.61962 7.99309 9.74568C8.16972 9.92646 8.33547 10.0921 8.48622 10.2365C8.72309 10.4635 8.92672 10.643 9.08653 10.7664C9.14206 10.2281 9.40044 9.73324 9.76294 9.36984C10.0942 9.03771 10.5284 8.80715 10.9856 8.77321C10.8647 8.62209 10.7 8.43727 10.4972 8.22562C10.346 8.0679 10.1717 7.89365 9.98084 7.70762ZM5.72137 8.07474L2.01422 11.7818L2.32359 12.0913L6.01344 8.40146L5.72137 8.07474ZM6.38891 8.82143L2.72137 12.489L3.03063 12.7983L6.68094 9.14815L6.38891 8.82143ZM11.0856 9.33102C10.7607 9.3353 10.4315 9.49602 10.1611 9.76712C9.80059 10.1285 9.57756 10.6687 9.65278 11.1953C9.81947 12.3622 10.395 13.2518 11.1984 13.7339C11.9087 14.16 12.8063 14.2761 13.8123 13.9521C13.0553 13.8268 12.3599 12.9926 12.3061 12.3693C12.6383 12.7698 13.0542 13.1364 13.5069 13.3615C13.1981 12.656 13.2194 11.9411 13.1604 11.3515C13.1182 10.9289 13.0388 10.5708 12.8049 10.2526C12.5709 9.93452 12.1667 9.6339 11.4067 9.38059C11.3032 9.3461 11.1947 9.32934 11.0856 9.33102ZM1.01213 11.5753L1.01203 11.5753L1.01209 11.5754L1.01213 11.5753ZM1.01209 11.5754L0.633438 12.5223L1.58319 13.4721L2.53022 13.0934L2.32366 12.8867L1.92578 12.489L1.61647 12.1797L1.21866 11.782L1.01209 11.5754ZM0.406 13.0906L0 14.1054L1.01494 13.6994L0.406 13.0906Z" fill="#274B9B"/>
        </svg>`;
                break;
            default:
                svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        }

        return this.sanitizer.bypassSecurityTrustHtml(svg);
    }

    getScoreClass(score: number): string {
        if (score >= 85) return 'text-[#0D823B]'; // Excellent (90, 92, 88)
        if (score >= 80) return 'text-[#0D823B]'; // Bien (84)
        if (score >= 70) return 'text-[#D6AB17]'; // Moyen (78)
        return 'text-red-500';
    }

    downloadDocument(doc: any): void {
        console.log('Téléchargement:', doc);
        // TODO: Implement download logic
    }
}
