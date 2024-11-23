import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerClavePage } from './restablecer-clave.page';

describe('RestablecerClavePage', () => {
  let component: RestablecerClavePage;
  let fixture: ComponentFixture<RestablecerClavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
