import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCategoriasComponent } from './banner-categorias.component';

describe('BannerCategoriasComponent', () => {
  let component: BannerCategoriasComponent;
  let fixture: ComponentFixture<BannerCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
