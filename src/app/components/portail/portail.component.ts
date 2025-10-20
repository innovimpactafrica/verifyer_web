import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portail.component.html',
  styleUrls: ['./portail.component.css']
})
export class PortailComponent {
  constructor(private router: Router) { }

  /**
   * Navigation vers la page de connexion
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigation vers la page d'inscription
   */
  goToSignup(): void {
    console.log('Navigation vers la page d\'inscription');
    // TODO: this.router.navigate(['/signup']);
  }
}
