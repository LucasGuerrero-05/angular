import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphoneCategoryComponent } from './iphone-category.component';

describe('IphoneCategoryComponent', () => {
  let component: IphoneCategoryComponent;
  let fixture: ComponentFixture<IphoneCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IphoneCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IphoneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
