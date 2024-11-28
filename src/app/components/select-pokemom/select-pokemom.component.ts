import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PokemonDetails, SelectPokemom } from '../../@types/types';
import { SendPokemomService } from '../../services/send-pokemom.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-pokemom',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-pokemom.component.html',
  styleUrl: './select-pokemom.component.scss'
})
export class SelectPokemomComponent implements OnInit {

  @Input('pokemonsList')
  pokemons : PokemonDetails[] = [];
  searchQuery: string = '';

  selectedPokemonId: number | null = null;

  sendPokemomService = inject(SendPokemomService);

  ngOnInit(): void {

  }

  get filteredPokemons(): PokemonDetails[] {
    return this.pokemons.filter((pokemon) => {
      const query = this.searchQuery.toLowerCase();
      const isNameMatch = pokemon.name.toLowerCase().includes(query);
      const isNumberMatch = pokemon.number.toString().includes(query);
      return isNameMatch || isNumberMatch;
    });
  }

  onClik (pokemom: PokemonDetails) {
    this.selectedPokemonId = pokemom.id;
     this.sendPokemomService.updatePokemon(pokemom);

   }

}
