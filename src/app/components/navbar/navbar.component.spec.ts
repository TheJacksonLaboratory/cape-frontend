import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from '../../_services/authentication.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

fdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        JwtModule.forRoot({})
      ],
      declarations: [NavbarComponent],
      providers: [AuthenticationService,
        JwtHelperService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async(inject([AuthenticationService], (authService: AuthenticationService) => {
    expect(component).toBeTruthy();
  })));
});
