import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from './ControlPokemonModalImage/Close'
import { FeedModal } from '../FeedModal'
import { StatsModal } from '../StatsModal'
import { PokemonState } from '../../API/baseAPI'
import { ControlPokemonModalFooter } from '../ControlPokemonModalFooter'

import {
  Tabs,
  Tab,
} from "../../pages/AuthForm"

type SubMenuHeaderProps = {
  pokemon: PokemonState;
  handleCloseModal: () => void;
  isModalOpen: boolean;
}

export const ControlPokemonModal = ({ pokemon, handleCloseModal, isModalOpen }: SubMenuHeaderProps) => {

  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'feed' | 'stats'>('feed');

  const checkClickOutside = (e: MouseEvent) => {
    if (isModalOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', checkClickOutside);

    return () => document.removeEventListener('mousedown', checkClickOutside);
  }, [isModalOpen])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div
        ref={modalRef}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderRadius: '2px',
          width: '572px',
          height: '457px',
        }}>
        <div
          style={{
            display: "flex",
            padding: '16px 24px 16px 24px',
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: '56px',
            boxShadow: '0px 1px 0px 0px rgba(240, 240, 240, 1)',
          }}>
          <div style={{
            fontWeight: 700,
            fontSize: "16px",
          }}>Управление покемоном {pokemon.name}</div>
          <button style={{
            border: 'none',
          }}
            onClick={handleCloseModal}>
            <CloseIcon />
          </button>
        </div>
        <div style = {{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '0 24px 24px 24px',
        }}>
          <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Tabs>
            <Tab
              $active={activeTab === 'feed'}
              onClick={() => setActiveTab('feed')}
            >
              Накормить
            </Tab>
            <Tab
              $active={activeTab === 'stats'}
              onClick={() => setActiveTab('stats')}
            >
              Статистика
            </Tab>
          </Tabs>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {activeTab === 'feed' && <FeedModal />}
          {activeTab === 'stats' && <StatsModal onButtonClick={handleCloseModal} pokemon={pokemon} />}
        </div>
        </div>
        <ControlPokemonModalFooter onButtonClick={handleCloseModal} />
      </div>
    </div>)
}
