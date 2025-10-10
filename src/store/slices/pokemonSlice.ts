import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonState } from '../../API/baseAPI'

interface PokemonArrayState {
  pokemons: PokemonState[];
}

const initialPokemonState: PokemonArrayState = {
  pokemons: []
}

const pokemonSlise = createSlice({
  name: 'pokemon',
  initialState: initialPokemonState,
  reducers: {
    addPokemon(state, action: PayloadAction<PokemonState>) {
      state.pokemons.push(action.payload);
    },
    removePokemon(state, action: PayloadAction<string>) {
      state.pokemons = state.pokemons.filter(pokemon => pokemon.name !== action.payload);
    },
  }
})

export const { addPokemon, removePokemon } = pokemonSlise.actions;
export default pokemonSlise.reducer;