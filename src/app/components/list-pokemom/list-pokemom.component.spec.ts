
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPokemomComponent } from './list-pokemom.component';
import { provideHttpClient } from '@angular/common/http';
import { PokemomService } from '../../services/pokemom.service';
import { of } from 'rxjs';

describe('ListPokemomComponent', () => {
  let component: ListPokemomComponent;
  let fixture: ComponentFixture<ListPokemomComponent>;
  let pokemomServiceSpy: jasmine.SpyObj<PokemomService>;

  const mockPokemons: any = [
    { id: 1, name: 'Pikachu', image: 'pikachu.png' },
    { id: 2, name: 'Charmander', image: 'charmander.png' },
  ];

  beforeEach(async () => {
    // Cria um spy para o serviço
    pokemomServiceSpy = jasmine.createSpyObj('PokemomService', ['fetchPokemonAbilities']);
    pokemomServiceSpy.fetchPokemonAbilities.and.returnValue(of(mockPokemons)); // Mock do método

    await TestBed.configureTestingModule({
      imports: [ListPokemomComponent], // Importa o componente como standalone
      providers: [
        provideHttpClient(), // Fornece o HttpClient necessário para o serviço
        { provide: PokemomService, useValue: pokemomServiceSpy }, // Mocka o serviço
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPokemomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Aplica as mudanças iniciais
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call PokemomService and set Pokemon list on init', () => {
    // Certifica-se de que o método fetchPokemonAbilities foi chamado
    expect(pokemomServiceSpy.fetchPokemonAbilities).toHaveBeenCalled();
    // Verifica se a lista de pokémons foi configurada corretamente
    expect(component.Pokemon).toEqual(mockPokemons);
  });

  it('should render the list of pokemons', () => {
    const pokemonElements = fixture.nativeElement.querySelectorAll('app-select-pokemom');
    expect(pokemonElements.length).toBe(1); // Deve ter um único seletor
  });

  it('should render Pokemon names and images in the DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const renderedImages = compiled.querySelectorAll('app-select-pokemom img');
    const renderedNames = compiled.querySelectorAll('app-select-pokemom span');

    expect(renderedImages.length).toBe(mockPokemons.length);
    expect(renderedNames.length).toBe(mockPokemons.length);

    expect(renderedNames[0].textContent).toContain('Pikachu');
    expect(renderedNames[1].textContent).toContain('Charmander');
  });
});
