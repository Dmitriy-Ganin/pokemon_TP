import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetRandomPokemonQuery } from '../../API/baseAPI';
import type { RootState } from '../../store/store';
import { setFirstEntry } from '../../store/slices/firstEntrySlice';
import { incrementMoney } from '../../store/slices/moneySlice';
import { addPokemon } from '../../store/slices/pokemonSlice';
import { SubMenuWrapper } from '../Menu/MenuStyle';
import { PokemonCard } from '../PokemonCard';
import { SubMenuHeader } from '../SubMenuHeader'

export const Pokemons: React.FC = () => {
  const dispatch = useDispatch();
  const isFirstEntry = useSelector((state: RootState) => state.firstEntry);
  //const [isFirstEntry, setisFirstEntry] = useState<boolean>(true);
  const pokemons = useSelector((state: RootState) => state.pokemon);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

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
        //setisFirstEntry(false);
        dispatch(setFirstEntry(false));
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
    <SubMenuWrapper>
      <SubMenuHeader 
        title="Pokemons"
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {pokemons.map((pokemon, index) => (
                <PokemonCard key={`${pokemon.name}-${index}`} pokemon={pokemon} />
              ))}
            </div>
          )}
        </>
      )}
    </SubMenuWrapper>
  );
};