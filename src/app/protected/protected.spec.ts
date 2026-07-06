import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Protected } from './protected';

describe('Protected', () => {
  let component: Protected;
  let fixture: ComponentFixture<Protected>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Protected],
    }).compileComponents();

    fixture = TestBed.createComponent(Protected);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
