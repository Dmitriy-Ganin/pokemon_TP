import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export interface PokemonState {
  name: string;
  order: number;
  sprites: {
    front_default: string;
  };
}

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getRandomPokemon: build.query<PokemonState, number | null>({
      query: (id) => ({
        url: `/pokemon/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: any): PokemonState => ({
        name: response.name,
        order: response.order,
        sprites: {
          front_default: response.sprites.front_default,
        },
      }),
    }),
  }),
});

export const { useGetRandomPokemonQuery } = baseAPI;