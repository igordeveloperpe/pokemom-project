
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PokeballComponent } from './components/pokeball/pokeball.component';
import { ListPokemomComponent } from './components/list-pokemom/list-pokemom.component';
import { NgClass } from '@angular/common';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        PokeballComponent,
        ListPokemomComponent,
        NgClass,
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render PokeballComponent', () => {
    const pokeball = fixture.debugElement.query(By.directive(PokeballComponent));
    expect(pokeball).toBeTruthy();
  });

  it('should set `isPokeballRotating` to true when `onPokeballClick` is called', () => {
    component.onPokeballClick();
    expect(component.isPokeballRotating).toBeTrue();
  });

  it('should reveal the content and set `isContentHidden` to false after delay when `onPokeballClick` is called', fakeAsync(() => {
    component.onPokeballClick();

    expect(component.isRevealActive).toBeFalse(); // Inicialmente falso
    tick(2000); // Simula o tempo de 2 segundos
    expect(component.isRevealActive).toBeTrue(); // Deve ser verdadeiro após 2 segundos

    expect(component.isContentHidden).toBeTrue(); // Inicialmente verdadeiro
    tick(500); // Mais 500ms para a segunda transição
    expect(component.isContentHidden).toBeFalse(); // Deve ser falso após 2.5 segundos
  }));
});
