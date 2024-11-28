import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokeballComponent } from './components/pokeball/pokeball.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { SelectPokemomComponent } from './components/select-pokemom/select-pokemom.component';
import { ListPokemomComponent } from './components/list-pokemom/list-pokemom.component';

@Component({
  selector: 'app-root',
  imports: [ NgClass, PokeballComponent, ListPokemomComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isPokeballRotating = false;
  isRevealActive = false;
  isContentHidden = true;

  onPokeballClick() {
    this.isPokeballRotating = true;

    // Adiciona a lógica para revelar a próxima seção
    setTimeout(() => {
      this.isRevealActive = true;
    }, 2000); // Tempo da animação de rotação (2s)
    setTimeout(() => {

      this.isContentHidden = false;
    }, 2500); // Tempo da animação de rotação (2s)
  }
}
