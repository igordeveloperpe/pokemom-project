import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPokemomComponent } from './select-pokemom.component';
import { SendPokemomService } from '../../services/send-pokemom.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SelectPokemomComponent', () => {
  let component: SelectPokemomComponent;
  let fixture: ComponentFixture<SelectPokemomComponent>;
  let sendPokemomServiceSpy: jasmine.SpyObj<SendPokemomService>;

  const mockPokemons: any = [
    { id: 1, name: 'Pikachu', number: 25, image: 'pikachu.png' },
    { id: 2, name: 'Charmander', number: 4, image: 'charmander.png' },
  ];

  beforeEach(async () => {
    sendPokemomServiceSpy = jasmine.createSpyObj('SendPokemomService', ['updatePokemon']);

    await TestBed.configureTestingModule({
      imports: [
        SelectPokemomComponent, // Adiciona como standalone
        FormsModule, // Necessário para ngModel no template
      ],
      providers: [
        provideHttpClient(), // Fornece o HttpClient necessário para o serviço
        { provide: SendPokemomService, useValue: sendPokemomServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPokemomComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should filter pokemons based on searchQuery', () => {
    component.pokemons = mockPokemons;
    component.searchQuery = 'char';
    expect(component.filteredPokemons.length).toBe(1);
    expect(component.filteredPokemons[0].name).toBe('Charmander');
  });

  it('should call onClick and update the selected Pokemon', () => {
    component.pokemons = mockPokemons;
    const selectedPokemon = mockPokemons[0];
    component.onClik(selectedPokemon);

    expect(component.selectedPokemonId).toBe(selectedPokemon.id);
    expect(sendPokemomServiceSpy.updatePokemon).toHaveBeenCalledWith(selectedPokemon);
  });

  it('should render the list of pokemons', () => {
    component.pokemons = mockPokemons;
    fixture.detectChanges();

    const pokemonElements = fixture.debugElement.queryAll(By.css('.pokemon-item'));
    expect(pokemonElements.length).toBe(2);
    expect(pokemonElements[0].nativeElement.textContent).toContain('Pikachu');
    expect(pokemonElements[1].nativeElement.textContent).toContain('Charmander');
  });

  it('should apply "selected" class to the selected pokemon', () => {
    component.pokemons = mockPokemons;
    component.selectedPokemonId = mockPokemons[0].id;
    fixture.detectChanges();

    const selectedElement = fixture.debugElement.query(By.css('.pokemon-item.selected'));
    expect(selectedElement).toBeTruthy();
    expect(selectedElement.nativeElement.textContent).toContain('Pikachu');
  });
});
