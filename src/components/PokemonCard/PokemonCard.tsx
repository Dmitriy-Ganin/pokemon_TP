import { PokemonState } from '../../API/baseAPI'

interface PokemonCard {
  pokemon: PokemonState;
}

export const PokemonCard = ({ pokemon }: PokemonCard) => {
  const { name, sprites, order } = pokemon;
  return (
    <div>
      <h2>{name}</h2>
      <img
        src={sprites.front_default}
        alt={name}
      />
      <div>
        <h3>Money:</h3>
        <span>{Math.round(order * 0.1)}</span>
      </div>
    </div>
  )
}