import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementFacturationComponent } from './paiement-facturation.component';

describe('PaiementFacturationComponent', () => {
    let component: PaiementFacturationComponent;
    let fixture: ComponentFixture<PaiementFacturationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaiementFacturationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PaiementFacturationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
