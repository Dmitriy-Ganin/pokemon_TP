import { PokemonState } from '../../API/baseAPI'
import { ControlPokemonModal } from '../ControlPokemonModal'
import SettingImage from './SettingImage/Settings.png'
import { useState } from 'react'

interface PokemonCard {
  pokemon: PokemonState;
}

export const PokemonCard = ({ pokemon }: PokemonCard) => {
  const { name, sprites, order, weight } = pokemon;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '165px',
        height: '247px',
        padding: '12px',
        borderRadius: '16px',
        gap: '12px',
        boxShadow: '0px 0px 16px 0px rgba(58, 58, 58, 0.1)',
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: "16px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%"
        }}>
          <div>
            {name}
          </div>
          <div
            style={{ cursor: 'pointer' }}
            onClick={handleSettingsClick}
          >
            <img
              src={SettingImage}
              alt='Setting'
              width='20px'
              height='20px' />
          </div>
        </div>
        <img
          src={sprites.front_default}
          alt={name}
          width="141px"
          height="141px"
        />
        <div style={{
          fontWeight: 700,
          fontSize: "16px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%"
        }}>
          <div>Money/sec:</div>
          <div>{Math.round(order * 0.1)}</div>
        </div>
        <div style={{
          fontWeight: 700,
          fontSize: "16px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%"
        }}>
          <div>Weight:</div>
          <div>{weight}</div>
        </div>
      </div>

      {isModalOpen && (
        <ControlPokemonModal
          pokemon={pokemon}
          handleCloseModal={handleCloseModal}
          isModalOpen = {isModalOpen}
        />)
      }
    </>
  )
}