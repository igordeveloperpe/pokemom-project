import { Component, Input, input } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../../@types/types';
import { SendPokemomService } from '../../services/send-pokemom.service';
import { AsyncPipe, CommonModule, NgStyle } from '@angular/common';

@Component({
  selector: 'app-poke-card',
  imports: [AsyncPipe,CommonModule, NgStyle],
  templateUrl: './poke-card.component.html',
  styleUrl: './poke-card.component.scss'
})
export class PokeCardComponent {
  //  @Input()
  //  namePokemom = ''

  //  @Input()
  //  number = 0

  //  @Input()
  //  type = ''

  //  @Input()
  //  color = ''

  //  @Input()
  //  imagePokemom = ''

  //  // Status

  //  @Input()
  //  hp = 0

  //  @Input()
  //  attack =  ''

  //  @Input()
  //  defense =  ''

  //  @Input()
  //  speed =  ''

  //  @Input()
  //  total =  ''

  //  //  Skills

  //  @Input()
  //    skills: string[] = []



     selectedPokemon$: Observable<PokemonDetails | null> | undefined;

     constructor(private sendPokemomService: SendPokemomService) {
      // Associa o observable diretamente ao serviço
      this.selectedPokemon$ = this.sendPokemomService.pokemon$

    }
}
