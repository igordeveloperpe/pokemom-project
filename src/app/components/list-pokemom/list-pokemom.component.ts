import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PokeCardComponent } from '../poke-card/poke-card.component';
import { SelectPokemomComponent } from '../select-pokemom/select-pokemom.component';
import { PokemomService } from '../../services/pokemom.service';
import { PokemonDetails } from '../../@types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-pokemom',
  imports: [PokeCardComponent,SelectPokemomComponent],
  templateUrl: './list-pokemom.component.html',
  styleUrl: './list-pokemom.component.scss'
})
export class ListPokemomComponent implements OnInit, OnDestroy {

  private pokemomService = inject(PokemomService);

  Pokemon : PokemonDetails[] = []

  private subscription: Subscription | undefined;


  ngOnInit(): void {
    this.pokemomService.fetchPokemonAbilities().subscribe((data) => this.Pokemon = data)
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Cancela a assinatura para evitar memory leaks
    }
  }



}





