import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPokemomComponent } from './list-pokemom.component';

describe('ListPokemomComponent', () => {
  let component: ListPokemomComponent;
  let fixture: ComponentFixture<ListPokemomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPokemomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPokemomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
