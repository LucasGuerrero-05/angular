import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacbookCategoryComponent } from './macbook-category.component';

describe('MacbookCategoryComponent', () => {
  let component: MacbookCategoryComponent;
  let fixture: ComponentFixture<MacbookCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacbookCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacbookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
