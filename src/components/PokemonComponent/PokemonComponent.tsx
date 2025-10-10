import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetRandomPokemonQuery } from '../../API/baseAPI';
import type { RootState } from '../../store/store';
// import { setFirstEntry } from '../../store/slices/firstEntrySlice';
import { incrementMoney } from '../../store/slices/moneySlice';
import { addPokemon } from '../../store/slices/pokemonSlice';

export const PokemonComponent: React.FC = () => {
  const dispatch = useDispatch();
  // const isFirstEntry = useSelector((state: RootState) => state.firstEntry.isFirstEntry);
  const [isFirstEntry, setisFirstEntry] = useState<boolean>(true);
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const {
    data: pokemon,
    isLoading,
    error,
  } = useGetRandomPokemonQuery(currentId, {
    skip: currentId === null
  });

  const handleFirstEntryClick = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    setCurrentId(randomId);
  };

  useEffect(() => {
    if (pokemon) {
      dispatch(addPokemon(pokemon));
      if (isFirstEntry) {
        setisFirstEntry(false);
        // dispatch(setFirstEntry(false));
      }
    }
  }, [pokemon, dispatch]);

  useEffect(() => {
    if (pokemons.length > 0) {
      const getMoney = setInterval(() => {
        const totalMoney = pokemons.reduce((sum, pokemon) => {
          return sum + Math.round(pokemon.order * 0.1);
        }, 0);
        dispatch(incrementMoney(totalMoney));
      }, 1000);
      return () => clearInterval(getMoney);
    }
  }, [pokemons, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pokemon</div>;

  return (
    <div>
      {isFirstEntry ? (
        <button onClick={handleFirstEntryClick}>
          Первый вход
        </button>
      ) : (
        <button onClick={handleFirstEntryClick}>
          Получить покемона
        </button>
      )}

      {pokemons.length > 0 && (
        <div>
          {pokemons.map((p, index) => (
            <div key={`${p.name}-${index}`}>
              <h2>{p.name}</h2>
              <img
                src={p.sprites.front_default}
                alt={p.name}
              />
              <div>
                <h3>Money:</h3>
                <span>{Math.round(p.order * 0.1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};