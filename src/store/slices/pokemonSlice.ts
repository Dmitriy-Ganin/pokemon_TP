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
    setPokemon(_, action: PayloadAction<PokemonState[]>) {
      return action.payload;
    },
    setRenamePokemon(state, action: PayloadAction<{ oldName: string, newName: string }>) {
      const oldName = action.payload.oldName;
      const newName = action.payload.newName;
      const upPokemon = state.map((pokemon) => {
        if (pokemon.name === oldName) {
          return {
            ...pokemon,
            name: newName
          };
        }
        return pokemon;
      });
      return upPokemon;
    },
  }
})

export const { addPokemon, removePokemon, clearPokemon, setPokemon, setRenamePokemon } = pokemonSlise.actions;
export default pokemonSlise.reducer;