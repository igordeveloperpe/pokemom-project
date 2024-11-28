export
interface PokemonAbilityResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// Tipagem para os detalhes da habilidade
export interface AbilityDetail {
  effect_entries: any;
  pokemon: {
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

// Tipagem para os detalhes de um Pokémon
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  species: {
    url: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[]
}

// Tipagem para os detalhes de uma espécie de Pokémon
export interface Species {
  color: {
    name: string;
  };
}

// Tipagem final para o Pokémon com todas as informações necessárias
export interface PokemonDetails {
  id?: any,
  name: string;
  image: string;
  svg: string;
  number: number;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  color: string | null;
  abilities: any
}


export interface SelectPokemom {
  name: string;
  imageUrl: string;
}
