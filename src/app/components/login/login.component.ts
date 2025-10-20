import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Propriétés du formulaire
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) { }

  /**
   * Toggle l'affichage du mot de passe
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Connexion classique avec email/mot de passe
   */
  onLogin(): void {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    console.log('Connexion avec:', {
      email: this.email,
      password: '***',
      rememberMe: this.rememberMe
    });

    // TODO: Appel API pour authentification
    // Exemple: this.authService.login(this.email, this.password).subscribe(...)
  }

  /**
   * Connexion avec Google OAuth
   */
  onGoogleLogin(): void {
    console.log('Connexion via Google OAuth');
    // TODO: Intégrer Google OAuth
  }

  /**
   * Connexion avec Apple ID
   */
  onAppleLogin(): void {
    console.log('Connexion via Apple ID');
    // TODO: Intégrer Apple Sign In
  }

  
  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
