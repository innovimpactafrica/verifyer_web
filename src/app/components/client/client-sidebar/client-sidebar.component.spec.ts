import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientSidebarComponent } from './client-sidebar.component';

describe('SidebarComponent', () => {
    let component: ClientSidebarComponent;
    let fixture: ComponentFixture<ClientSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClientSidebarComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ClientSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
