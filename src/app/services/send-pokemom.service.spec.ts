import { TestBed } from '@angular/core/testing';

import { SendPokemomService } from './send-pokemom.service';

describe('SendPokemomService', () => {
  let service: SendPokemomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendPokemomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
