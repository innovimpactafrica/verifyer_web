import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientSidebarComponent } from '../../client-sidebar/client-sidebar.component';

@Component({
  selector: 'app-nouvelle-demande',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ClientSidebarComponent],
  templateUrl: './nouvelle-demande.component.html',
  styleUrl: './nouvelle-demande.component.css'
})
export class NouvelleDemandeComponent {

}
