import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    fullName: string = '';
    email: string = '';
    phone: string = '';
    password: string = '';
    confirmPassword: string = '';
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;
    acceptTerms: boolean = false;

    // Phone country code dropdown
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

    constructor(private router: Router) { }

    togglePassword(): void {
        this.showPassword = !this.showPassword;
    }

    toggleConfirmPassword(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
    }

    toggleCountryDropdown(): void {
        this.showCountryDropdown = !this.showCountryDropdown;
    }

    selectCountry(country: any): void {
        this.selectedCountry = country;
        this.showCountryDropdown = false;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const clickedInside = target.closest('.country-selector-container');

        if (!clickedInside && this.showCountryDropdown) {
            this.showCountryDropdown = false;
        }
    }

    onSignup(): void {
        // Validation
        if (!this.fullName || !this.email || !this.phone || !this.password || !this.confirmPassword) {
            console.error('Tous les champs sont obligatoires');
            return;
        }

        if (this.password !== this.confirmPassword) {
            console.error('Les mots de passe ne correspondent pas');
            return;
        }


        // TODO: Implement signup API call
        console.log('Signup attempt:', {
            fullName: this.fullName,
            email: this.email,
            phone: this.phone
        });
    }


    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}
