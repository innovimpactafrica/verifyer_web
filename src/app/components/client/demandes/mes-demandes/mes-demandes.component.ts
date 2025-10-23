import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-mes-demandes',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './mes-demandes.component.html',
  styleUrl: './mes-demandes.component.css'
})
export class MesDemandesComponent {

}
