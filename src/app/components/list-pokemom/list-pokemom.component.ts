import { Pokemon } from './../../@types/types';
import { Component, inject, OnInit } from '@angular/core';
import { PokeCardComponent } from '../poke-card/poke-card.component';
import { SelectPokemomComponent } from '../select-pokemom/select-pokemom.component';
import { PokemomService } from '../../services/pokemom.service';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetails, SelectPokemom } from '../../@types/types';

@Component({
  selector: 'app-list-pokemom',
  imports: [PokeCardComponent,SelectPokemomComponent],
  templateUrl: './list-pokemom.component.html',
  styleUrl: './list-pokemom.component.scss'
})
export class ListPokemomComponent implements OnInit {

  private pokemomService = inject(PokemomService);

  Pokemon : PokemonDetails[] = []


  ngOnInit(): void {
    this.pokemomService.fetchPokemonAbilities().subscribe((data) => this.Pokemon = data)


  }



}





