

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDetails, PokemonAbilityResponse, AbilityDetail, Pokemon, Species } from '../@types/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemomService {
  constructor(private http: HttpClient) {}

  pokemonList: PokemonDetails[] = [];
   pokemonDetailsSubject = new BehaviorSubject<PokemonDetails[]>([]);

  fetchPokemonAbilities(): Observable<PokemonDetails[]> {
    const abilityApiUrl = 'https://pokeapi.co/api/v2/ability/?limit=20&offset=20';
    const pokemonDetailsSubject = new BehaviorSubject<PokemonDetails[]>([]);

    this.http.get<PokemonAbilityResponse>(abilityApiUrl).subscribe((abilityData) => {
      abilityData.results.forEach((ability) => {
        this.http.get<AbilityDetail>(ability.url).subscribe((abilityDetails) => {
          const pokemonWithAbility = abilityDetails.pokemon;

          pokemonWithAbility.forEach((pokeEntry, index) => {
            this.http.get<Pokemon>(pokeEntry.pokemon.url).subscribe((pokemonData) => {
              const pokemonDetails: PokemonDetails = {
                 id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.other['official-artwork']?.front_default ?? '',
                svg: pokemonData.sprites.other.dream_world?.front_default ?? '',
                number: pokemonData.id,
                types: pokemonData.types.map((type) => type.type.name),
                stats: {
                  hp: pokemonData.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0,
                  attack: pokemonData.stats.find((stat) => stat.stat.name === 'attack')?.base_stat ?? 0,
                  defense: pokemonData.stats.find((stat) => stat.stat.name === 'defense')?.base_stat ?? 0,
                  speed: pokemonData.stats.find((stat) => stat.stat.name === 'speed')?.base_stat ?? 0,
                },
                abilities: pokemonData.abilities.map((ability) => ability.ability.name),
                color: null, // Placeholder para a cor, será preenchido na próxima chamada
              };

              // Buscar a cor do Pokémon pelo endpoint species
              this.http.get<Species>(pokemonData.species.url).subscribe((speciesData) => {
                pokemonDetails.color = speciesData.color.name;
                this.pokemonList.push(pokemonDetails);
                pokemonDetailsSubject.next(this.pokemonList);
              });
            });
          });
        });
      });
    });

    return pokemonDetailsSubject.asObservable();
  }


}


