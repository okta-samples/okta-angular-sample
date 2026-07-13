import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { vi } from 'vitest';

describe('AppComponent', () => {
  const authStateSpy = {
    authState$: of({
      isAuthenticated: false
    })
  };

  const authSpy = {
    signOut: vi.fn().mockResolvedValue(undefined)
  };

  beforeEach(async () => {
    authSpy.signOut.mockReset();
    authSpy.signOut.mockResolvedValue(undefined);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        provideRouter([]),
        { provide: OktaAuthStateService, useValue: authStateSpy },
        { provide: OKTA_AUTH, useValue: authSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')?.textContent).toContain('Sign in');
    expect(compiled.textContent).toContain('Okta for Developers');
  });
});
