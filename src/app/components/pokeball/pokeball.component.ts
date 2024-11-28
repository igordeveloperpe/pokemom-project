import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokeball',
  imports: [NgClass],
  templateUrl: './pokeball.component.html',
  styleUrl: './pokeball.component.scss'
})
export class PokeballComponent {
  @Input() isRotating = false;
  @Output() pokeballClick = new EventEmitter<void>();

  handleClick() {
    this.pokeballClick.emit(); // Emite um evento para o componente pai
  }
}
