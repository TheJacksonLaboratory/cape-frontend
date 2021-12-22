import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../_services/alert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                FormsModule,
                MatIconModule,
                MatProgressBarModule,
                RouterTestingModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            declarations: [LoginComponent],
            providers: [
                AlertService,
                { provide: MatDialog, useValue: {} }
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    afterAll(() => {
        TestBed.resetTestingModule();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
