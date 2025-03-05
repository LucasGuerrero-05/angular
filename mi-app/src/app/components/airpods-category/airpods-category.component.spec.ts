import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirpodsCategoryComponent } from './airpods-category.component';

describe('AirpodsCategoryComponent', () => {
  let component: AirpodsCategoryComponent;
  let fixture: ComponentFixture<AirpodsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirpodsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirpodsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
