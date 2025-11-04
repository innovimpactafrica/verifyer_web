import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

interface Rapport {
  id: string;
  name: string;
  type: string;
  reference: string;
  zone: string;
  address: string;
  client: string;
  agent: string;
  dateSubmission: string;
  status: string;
  statusColor: string;
  qualityScore: number;
  evaluations: {
    title: string;
    score: string;
    description: string;
  }[];
  photos: string[];
}

@Component({
  selector: 'app-rapport-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AdminSidebarComponent],
  templateUrl: './rapport-detail.component.html',
  styleUrl: './rapport-detail.component.css'
})
export class RapportDetailComponent implements OnInit {
  rapport: Rapport | null = null;

  // Lightbox state
  showLightbox: boolean = false;
  currentPhotoIndex: number = 0;

  // Modal confirmation state
  showConfirmModal: boolean = false;

  // Modal rejet state
  showRejectModal: boolean = false;

  // Modal motif de rejet
  showRejectReasonModal: boolean = false;
  rejectReason: string = '';

  // Success message state
  showSuccessMessage: boolean = false;
  showRejectSuccessMessage: boolean = false;

  // Données de démonstration
  private rapportsData: { [key: string]: Rapport } = {
    'RPT-2025-004': {
      id: 'RPT-2025-004',
      name: 'Résidence Samba',
      type: 'Immeuble',
      reference: 'DEM-145',
      zone: 'Dakar',
      address: 'Sicap, Rue 12',
      client: 'Aminata Sow',
      agent: 'Ibrahima Ndiaye',
      dateSubmission: '2025-09-23',
      status: 'En attente',
      statusColor: 'text-[#A16207] bg-[#FFF4E5]',
      qualityScore: 86,
      evaluations: [
        { title: 'État général', score: '5/5', description: 'Bonne structure, halls propres' },
        { title: 'Conformité sécurité', score: '4/5', description: 'Extincteurs OK, signalétique incomplète' },
        { title: 'Accessibilité', score: '4/5', description: 'Ascenseur fonctionnel' },
        { title: 'Équipements', score: '5/5', description: 'Électricité/canalisations neuves' },
        { title: 'Hygiène', score: '4/5', description: 'Parties communes entretenues' }
      ],
      photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg']
    },
    'RPT-2025-003': {
      id: 'RPT-2025-003',
      name: 'Blue Lodge',
      type: 'Hôtel',
      reference: 'DEM-146',
      zone: 'Thiès',
      address: 'Avenue Lamine Gueye',
      client: 'Mame Diouf',
      agent: 'Cheikh Sarr',
      dateSubmission: '2022-10-20',
      status: 'En attente',
      statusColor: 'text-[#A16207] bg-[#FFF4E5]',
      qualityScore: 92,
      evaluations: [
        { title: 'État général', score: '5/5', description: 'Excellent état' },
        { title: 'Conformité sécurité', score: '5/5', description: 'Tous les équipements conformes' },
        { title: 'Accessibilité', score: '4/5', description: 'Rampes d\'accès présentes' },
        { title: 'Équipements', score: '5/5', description: 'Installations modernes' },
        { title: 'Hygiène', score: '5/5', description: 'Propreté irréprochable' }
      ],
      photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg']
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const rapportId = params['id'];
      this.rapport = this.rapportsData[rapportId] || null;
    });
  }

  validateReport() {
    console.log('Valider le rapport:', this.rapport?.id);
    // Logique de validation
  }

  rejectReport() {
    console.log('Rejeter le rapport:', this.rapport?.id);
    // Logique de rejet
  }

  // Lightbox methods
  openLightbox(index: number) {
    this.currentPhotoIndex = index;
    this.showLightbox = true;
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
  }

  closeLightbox() {
    this.showLightbox = false;
    document.body.style.overflow = 'auto'; // Réactiver le scroll
  }

  nextPhoto() {
    if (this.rapport && this.currentPhotoIndex < this.rapport.photos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  previousPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }

  onLightboxClick(event: MouseEvent) {
    // Fermer le lightbox si on clique sur le fond (pas sur l'image)
    if ((event.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.closeLightbox();
    }
  }

  // Upload photo
  onPhotoUpload(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.rapport) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && this.rapport) {
          // Remplacer le placeholder par l'image uploadée
          this.rapport.photos[index] = e.target.result as string;
        }
      };

      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(index: number) {
    const fileInput = document.getElementById(`file-input-${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Modal methods
  openConfirmModal() {
    this.showConfirmModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    document.body.style.overflow = 'auto';
  }

  confirmValidation() {
    // Logique de validation du rapport
    console.log('Rapport validé:', this.rapport?.id);

    // Fermer le modal de confirmation
    this.closeConfirmModal();

    // Afficher le message de succès
    this.showSuccessMessage = true;

    // Rediriger vers la page certificats après 2 secondes
    setTimeout(() => {
      this.showSuccessMessage = false;
      this.router.navigate(['/admin/certificats']);
    }, 2000);
  }

  // Modal rejet methods
  openRejectModal() {
    this.showRejectModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeRejectModal() {
    this.showRejectModal = false;
    document.body.style.overflow = 'auto';
  }

  confirmRejection() {
    // Fermer le modal de confirmation de rejet
    this.closeRejectModal();

    // Ouvrir le modal de motif de rejet
    this.showRejectReasonModal = true;
  }

  closeRejectReasonModal() {
    this.showRejectReasonModal = false;
    this.rejectReason = '';
    document.body.style.overflow = 'auto';
  }

  submitRejection() {
    // Logique de rejet du rapport avec motif
    console.log('Rapport rejeté:', this.rapport?.id, 'Motif:', this.rejectReason);

    // Fermer le modal de motif
    this.closeRejectReasonModal();

    // Afficher le message de succès de rejet
    this.showRejectSuccessMessage = true;

    // Rediriger vers la page rapports après 2 secondes
    setTimeout(() => {
      this.showRejectSuccessMessage = false;
      this.router.navigate(['/admin/rapports']);
    }, 2000);
  }

  // UI helpers - similaires à mission-detail
  getBienColor(type: string): string {
    switch (type) {
      case 'Immeuble':
        return 'bg-[#0D823B0D]';
      case 'Hôtel':
        return 'bg-[#FD7E140F]';
      case 'Restaurant':
        return 'bg-[#6F42C10F]';
      case 'Atelier':
        return 'bg-[#274B9B14]';
      default:
        return 'bg-gray-100';
    }
  }

  getBienSvg(type: string): SafeHtml {
    let svg = '';
    switch (type) {
      case 'Immeuble':
        svg = `<svg width="24" height="24" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.75 19.7501H0.750031M0.750031 8.7501L8.87603 2.2501C9.40796 1.82459 10.0689 1.59277 10.75 1.59277C11.4312 1.59277 12.0921 1.82459 12.624 2.2501L20.75 8.7501" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M14.25 3.25V1.25C14.25 1.11739 14.3027 0.990215 14.3965 0.896447C14.4902 0.802679 14.6174 0.75 14.75 0.75H17.25C17.3826 0.75 17.5098 0.802679 17.6036 0.896447C17.6974 0.990215 17.75 1.11739 17.75 1.25V6.25" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round" />
                <path d="M2.75003 19.75V7.25M18.75 19.75V7.25" stroke="#0D823B" stroke-width="1.5" stroke-linecap="round" />
                <path opacity="0.5" d="M13.75 19.75V14.75C13.75 13.336 13.75 12.629 13.31 12.19C12.872 11.75 12.165 11.75 10.75 11.75C9.33503 11.75 8.62903 11.75 8.19003 12.19C7.75003 12.628 7.75003 13.335 7.75003 14.75V19.75M12.75 7.25C12.75 7.78043 12.5393 8.28914 12.1642 8.66421C11.7892 9.03929 11.2805 9.25 10.75 9.25C10.2196 9.25 9.71089 9.03929 9.33582 8.66421C8.96074 8.28914 8.75003 7.78043 8.75003 7.25C8.75003 6.71957 8.96074 6.21086 9.33582 5.83579C9.71089 5.46071 10.2196 5.25 10.75 5.25C11.2805 5.25 11.7892 5.46071 12.1642 5.83579C12.5393 6.21086 12.75 6.71957 12.75 7.25Z" stroke="#0D823B" stroke-width="1.5" />
            </svg>`;
        break;
      case 'Hôtel':
        svg = `<svg width="24" height="24" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 15V0H2V10H10V2H18C19.1 2 20.0417 2.39167 20.825 3.175C21.6083 3.95833 22 4.9 22 6V15H20V12H2V15H0ZM6 9C5.16667 9 4.45833 8.70833 3.875 8.125C3.29167 7.54167 3 6.83333 3 6C3 5.16667 3.29167 4.45833 3.875 3.875C4.45833 3.29167 5.16667 3 6 3C6.83333 3 7.54167 3.29167 8.125 3.875C8.70833 4.45833 9 5.16667 9 6C9 6.83333 8.70833 7.54167 8.125 8.125C7.54167 8.70833 6.83333 9 6 9ZM12 10H20V6C20 5.45 19.8043 4.97933 19.413 4.588C19.0217 4.19667 18.5507 4.00067 18 4H12V10ZM6 7C6.28333 7 6.521 6.904 6.713 6.712C6.905 6.52 7.00067 6.28267 7 6C6.99933 5.71733 6.90333 5.48 6.712 5.288C6.52067 5.096 6.28333 5 6 5C5.71667 5 5.47933 5.096 5.288 5.288C5.09667 5.48 5.00067 5.71733 5 6C4.99933 6.28267 5.09533 6.52033 5.288 6.713C5.48067 6.90567 5.718 7.00133 6 7Z" fill="#FD7E14"/>
            </svg>`;
        break;
      case 'Restaurant':
        svg = `<svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                  <path d="M1.79655 1.49194L13.31 13.0054C13.5285 13.2239 13.6512 13.5202 13.6512 13.8291C13.6512 14.1381 13.5285 14.4344 13.31 14.6529C13.0915 14.8713 12.7952 14.9939 12.4862 14.9939C12.1773 14.9939 11.881 14.8713 11.6625 14.6529L8.84999 11.7919C8.66594 11.605 8.56268 11.3533 8.56249 11.091V10.9182C8.56252 10.7857 8.53623 10.6546 8.48516 10.5324C8.43409 10.4102 8.35925 10.2994 8.26499 10.2063L7.90187 9.87101C7.7786 9.75726 7.62869 9.67635 7.46596 9.63572C7.30323 9.59509 7.13288 9.59605 6.97062 9.63851C6.71473 9.70529 6.44583 9.704 6.1906 9.63476C5.93537 9.56553 5.70268 9.43076 5.51562 9.24382L2.84593 6.57382C1.26218 4.99007 0.679367 2.59851 1.79655 1.49194Z" stroke="#6F42C1" stroke-linejoin="round"/>
                  <path d="M12.5 1L10.0859 3.41406C9.90018 3.59979 9.75282 3.82029 9.65229 4.06297C9.55175 4.30565 9.50001 4.56576 9.50001 4.82844V5.29281C9.50002 5.35851 9.48708 5.42357 9.46193 5.48427C9.43678 5.54497 9.39992 5.60012 9.35345 5.64656L9.00001 6M10 7L10.3534 6.64656C10.3999 6.60009 10.455 6.56322 10.5157 6.53808C10.5764 6.51293 10.6415 6.49999 10.7072 6.5H11.1716C11.4343 6.5 11.6944 6.44826 11.937 6.34772C12.1797 6.24718 12.4002 6.09983 12.5859 5.91406L15 3.5M13.75 2.25L11.25 4.75M6.25001 11.5L3.13376 14.6337C2.89935 14.8681 2.58146 14.9997 2.25001 14.9997C1.91855 14.9997 1.60067 14.8681 1.36626 14.6337C1.13192 14.3993 1.00027 14.0815 1.00027 13.75C1.00027 13.4185 1.13192 13.1007 1.36626 12.8663L4.00001 10.25" stroke="#6F42C1" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs><clipPath id="clip0"><rect width="24" height="24" fill="white"/></clipPath></defs>
            </svg>`;
        break;
      default:
        svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="8" width="14" height="9" rx="2" fill="#6B7280"/></svg>`;
    }
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
