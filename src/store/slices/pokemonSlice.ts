import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PokemonState } from '../../API/baseAPI'

const initialPokemonState: PokemonState[] = []

const pokemonSlise = createSlice({
  name: 'pokemon',
  initialState: initialPokemonState,
  reducers: {
    addPokemon(state, action: PayloadAction<PokemonState>) {
      state.push(action.payload);
    },
    removePokemon(state, action: PayloadAction<string>) {
      return state.filter(pokemon => pokemon.name !== action.payload);
    },
    clearPokemon() {
      return initialPokemonState;
    },
  }
})

export const { addPokemon, removePokemon, clearPokemon } = pokemonSlise.actions;
export default pokemonSlise.reducer;