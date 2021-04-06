import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandUpdateDeleteComponent } from './brand-update-delete.component';

describe('BrandUpdateDeleteComponent', () => {
  let component: BrandUpdateDeleteComponent;
  let fixture: ComponentFixture<BrandUpdateDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandUpdateDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandUpdateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
