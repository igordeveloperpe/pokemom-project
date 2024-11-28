import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPokemomComponent } from './select-pokemom.component';

describe('SelectPokemomComponent', () => {
  let component: SelectPokemomComponent;
  let fixture: ComponentFixture<SelectPokemomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPokemomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPokemomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
