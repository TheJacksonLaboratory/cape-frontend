import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MainSelectionComponent } from './main-selection.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MainSelectionComponent', () => {
  let component: MainSelectionComponent;
  let fixture: ComponentFixture<MainSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        JwtModule.forRoot({})
      ],
      declarations: [ MainSelectionComponent ],
      providers: [
        AuthenticationService,
        JwtHelperService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(inject([AuthenticationService], (authService: AuthenticationService) => {
    expect(component).toBeTruthy();
  })));
});
