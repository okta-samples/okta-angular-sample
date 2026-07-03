import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { OKTA_AUTH } from '@okta/okta-angular';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('ProfileComponent', () => {
  const name = 'Awesome dev';
  const claims = { name, sub: 'abc123' };

  const authSpy = {
    authStateManager: {
      getAuthState: vi.fn().mockReturnValue({
        isAuthenticated: true,
        idToken: {
          claims
        }
      })
    }
  };

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileComponent
      ],
      providers: [
        { provide: OKTA_AUTH, useValue: authSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ID token claims table', () => {
    const cell = fixture.debugElement.query(By.css('#claim-sub'));
    expect(cell.nativeElement.textContent).toContain('abc123');
  });

  it('should render all claims in the table', () => {
    const nameCell = fixture.debugElement.query(By.css('#claim-name'));
    expect(nameCell.nativeElement.textContent).toContain(name);
  });
});
