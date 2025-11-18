import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClientSidebarComponent } from '../../client-sidebar/client-sidebar.component';
import { DemandesService } from '../../../../services/demandes.service';

@Component({
  selector: 'app-nouvelle-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ClientSidebarComponent],
  templateUrl: './nouvelle-demande.component.html',
  styleUrl: './nouvelle-demande.component.css'
})
export class NouvelleDemandeComponent {
  // Form data
  newDemande = {
    type: '',
    name: '',
    address: '',
    description: ''
  };

  constructor(
    private demandesService: DemandesService,
    private router: Router
  ) { }

  // Créer une nouvelle demande
  createDemande(event: Event) {
    event.preventDefault();

    // Validation basique
    if (!this.newDemande.type || !this.newDemande.name || !this.newDemande.address) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Obtenir les icônes selon le type
    const { iconBg, iconSvg } = this.demandesService.getIconByType(this.newDemande.type);

    // Créer la nouvelle demande avec statut "Soumis" par défaut
    const demande = {
      title: this.newDemande.name,
      reference: this.demandesService.getNextReference(),
      type: this.newDemande.type,
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'Soumis', // Statut par défaut
      statusBg: 'bg-gray-100',
      statusColor: 'text-gray-700',
      iconBg: iconBg,
      iconSvg: iconSvg
    };

    // Ajouter la demande via le service
    this.demandesService.addDemande(demande);

    // Rediriger vers la liste des demandes
    this.router.navigate(['/mes-demandes']);
  }
}
