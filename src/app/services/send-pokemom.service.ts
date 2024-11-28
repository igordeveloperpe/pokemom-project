import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetails } from '../@types/types';

@Injectable({
  providedIn: 'root'
})
export class SendPokemomService {

  private pokemonSubject = new BehaviorSubject<PokemonDetails | null>({
    id: 133,
    name: 'Eevee',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
    svg: 'https://iconape.com/wp-content/png_logo_vector/eevee-logo.png',
    number: 133,
    types: ['Normal'],
    stats: {
      hp: 55,
      attack: 55,
      defense: 50,
      speed: 55,
    },
    color: 'brown',
    abilities: ['Run Away', 'Adaptability', 'Anticipation'],
  });


  pokemon$: Observable<PokemonDetails | null> = this.pokemonSubject.asObservable();

  constructor() { }
  updatePokemon(pokemon: PokemonDetails): void {
    this.pokemonSubject.next(pokemon);
  }

}
