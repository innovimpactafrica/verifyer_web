import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPaiementFacturationComponent } from './detail-paiement-facturation.component';

describe('DetailPaiementFacturationComponent', () => {
    let component: DetailPaiementFacturationComponent;
    let fixture: ComponentFixture<DetailPaiementFacturationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DetailPaiementFacturationComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DetailPaiementFacturationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
