import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesSectionComponent } from './demandes-section.component';

describe('DemandesSectionComponent', () => {
  let component: DemandesSectionComponent;
  let fixture: ComponentFixture<DemandesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
