import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesSectionComponent } from './deliveries-section.component';

describe('DeliveriesSectionComponent', () => {
  let component: DeliveriesSectionComponent;
  let fixture: ComponentFixture<DeliveriesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
