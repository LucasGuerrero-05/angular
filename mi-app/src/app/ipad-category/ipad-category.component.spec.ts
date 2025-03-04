import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpadCategoryComponent } from './ipad-category.component';

describe('IpadCategoryComponent', () => {
  let component: IpadCategoryComponent;
  let fixture: ComponentFixture<IpadCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IpadCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpadCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
