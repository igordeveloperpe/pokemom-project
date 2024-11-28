import { TestBed } from '@angular/core/testing';

import { PokemomService } from './pokemom.service';

describe('PokemomService', () => {
  let service: PokemomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
