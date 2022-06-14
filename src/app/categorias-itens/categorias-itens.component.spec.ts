import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasItensComponent } from './categorias-itens.component';

describe('CategoriasItensComponent', () => {
  let component: CategoriasItensComponent;
  let fixture: ComponentFixture<CategoriasItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasItensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
