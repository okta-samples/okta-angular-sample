import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { MessagesComponent } from './messages.component';
import { OKTA_AUTH } from '@okta/okta-angular';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let httpMock: HttpTestingController;

  const authSpy = {
    getAccessToken: vi.fn().mockReturnValue('letMeIn')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: OKTA_AUTH, useValue: authSpy }
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders messages returned from the resource server', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:8000/api/messages');
    req.flush({
      messages: [
        { date: '2024-01-01T00:00:00.000Z', text: 'Hello there' }
      ]
    });

    fixture.detectChanges();
    const row = fixture.debugElement.query(By.css('#message-0'));
    expect(row.nativeElement.textContent).toContain('Hello there');
  });

  it('shows an error message when the request fails', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:8000/api/messages');
    req.flush('failure', { status: 401, statusText: 'Unauthorized' });

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Failed to fetch messages');
  });
});
