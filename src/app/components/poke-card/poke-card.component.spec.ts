import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeCardComponent } from './poke-card.component';
import { SendPokemomService } from '../../services/send-pokemom.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PokeCardComponent', () => {
  let component: PokeCardComponent;
  let fixture: ComponentFixture<PokeCardComponent>;
  let mockSendPokemomService: jasmine.SpyObj<SendPokemomService>;

  const mockPokemonDetails = {
    id: 1,
    name: 'Pikachu',
    number: 25,
    color: 'yellow',
    image: 'pikachu-image.png',
    svg: 'pikachu-svg.png',
    types: ['Electric'],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
    abilities: ['Static', 'Lightning Rod'],
  };

  beforeEach(async () => {
    mockSendPokemomService = jasmine.createSpyObj('SendPokemomService', ['pokemon$']);
    mockSendPokemomService.pokemon$ = of(mockPokemonDetails); // Mock do observable

    await TestBed.configureTestingModule({
      imports: [PokeCardComponent],
      providers: [{ provide: SendPokemomService, useValue: mockSendPokemomService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Pokemon name and number', () => {
    fixture.detectChanges();
    const nameElement = fixture.debugElement.query(By.css('.name-pokemom')).nativeElement;
    const numberElement = fixture.debugElement.query(By.css('.number-pokemom')).nativeElement;

    expect(nameElement.textContent).toContain('Pikachu');
    expect(numberElement.textContent).toContain('#25');
  });

  it('should display the correct image based on SVG availability', () => {
    fixture.detectChanges();
    const imageElement = fixture.debugElement.query(By.css('figure img')).nativeElement;

    // Certifica-se de que o SVG é usado quando disponível
    expect(imageElement.src).toContain('pikachu-svg.png');
  });

  it('should render Pokemon stats and abilities', () => {
    fixture.detectChanges();
    const statsElement = fixture.debugElement.query(By.css('.stats ul')).nativeElement;
    const abilitiesElement = fixture.debugElement.query(By.css('.abilities ul')).nativeElement;

    expect(statsElement.textContent).toContain('HP: 35');
    expect(statsElement.textContent).toContain('Attack: 55');
    expect(statsElement.textContent).toContain('Defense: 40');
    expect(statsElement.textContent).toContain('Speed: 90');

    expect(abilitiesElement.textContent).toContain('Static');
    expect(abilitiesElement.textContent).toContain('Lightning Rod');
  });
});
