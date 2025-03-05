import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchCategoryComponent } from './watch-category.component';

describe('WatchCategoryComponent', () => {
  let component: WatchCategoryComponent;
  let fixture: ComponentFixture<WatchCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
