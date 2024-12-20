import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { OKTA_AUTH } from '@okta/okta-angular';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const authSpy = jasmine.createSpyObj('OktaAuth', ['login', 'isAuthenticated', 'getUser']);

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ HomeComponent ],
      providers: [{ provide: OKTA_AUTH, useValue: authSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
