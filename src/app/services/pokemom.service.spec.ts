import { TestBed } from '@angular/core/testing';
import { PokemomService } from './pokemom.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PokemomService', () => {
  let service: PokemomService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokemomService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica se todas as requisições foram tratadas
  });


  it('should fetch Pokemon abilities', (done) => {
    const mockAbilityResponse = {
      results: [
        { url: 'https://pokeapi.co/api/v2/ability/1', name: 'stench' },
      ],
    };

    const mockAbilityDetail = {
      pokemon: [
        { pokemon: { url: 'https://pokeapi.co/api/v2/pokemon/1', name: 'bulbasaur' } },
      ],
    };

    const mockPokemonData = {
      id: 1,
      name: 'bulbasaur',
      sprites: {
        other: {
          'official-artwork': { front_default: 'bulbasaur.png' },
          dream_world: { front_default: 'bulbasaur-dream.png' },
        },
      },
      types: [{ type: { name: 'grass' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 45 },
        { stat: { name: 'attack' }, base_stat: 49 },
        { stat: { name: 'defense' }, base_stat: 49 },
        { stat: { name: 'speed' }, base_stat: 45 },
      ],
      abilities: [{ ability: { name: 'overgrow' } }],
      species: { url: 'https://pokeapi.co/api/v2/pokemon-species/1' },
    };

    const mockSpeciesData = {
      color: { name: 'green' },
    };

    service.fetchPokemonAbilities().subscribe({
      next: (pokemonDetails) => {
        if (pokemonDetails.length > 0) {
          expect(pokemonDetails.length).toBe(1);
          expect(pokemonDetails[0].name).toBe('bulbasaur');
          expect(pokemonDetails[0].color).toBe('green');
          done(); // Marca o teste como concluído
        }
      },
      error: (error) => done.fail(error), // Lida com erros
    });

    // Mock para a requisição inicial
    const abilityReq = httpTestingController.expectOne(
      'https://pokeapi.co/api/v2/ability/?limit=20&offset=20'
    );
    expect(abilityReq.request.method).toBe('GET');
    abilityReq.flush(mockAbilityResponse);

    // Mock para o detalhe da habilidade
    const abilityDetailReq = httpTestingController.expectOne('https://pokeapi.co/api/v2/ability/1');
    expect(abilityDetailReq.request.method).toBe('GET');
    abilityDetailReq.flush(mockAbilityDetail);

    // Mock para os detalhes do Pokémon
    const pokemonReq = httpTestingController.expectOne('https://pokeapi.co/api/v2/pokemon/1');
    expect(pokemonReq.request.method).toBe('GET');
    pokemonReq.flush(mockPokemonData);

    // Mock para os detalhes da espécie
    const speciesReq = httpTestingController.expectOne('https://pokeapi.co/api/v2/pokemon-species/1');
    expect(speciesReq.request.method).toBe('GET');
    speciesReq.flush(mockSpeciesData);
  });

});
