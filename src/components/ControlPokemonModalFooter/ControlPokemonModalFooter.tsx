type ControlPokemonModalFooterProps = {
  onButtonClick: () => void;
}
export const ControlPokemonModalFooter = ({ onButtonClick }: ControlPokemonModalFooterProps) => {
  return <div style={{
    height: '32px',
    boxShadow: '0px -1px 0px 0px rgba(240, 240, 240, 1)',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }}>
    <button
      onClick={onButtonClick}
      style={{
        width: "89px",
        height: "32px",
        paddingTop: "4px",
        paddingRight: "15px",
        paddingBottom: "4px",
        paddingLeft: "15px",
        gap: "8px",
        borderRadius: "2px",
        background: "rgba(54, 95, 172, 1)",
        color: 'rgba(255, 255, 255, 1)',
      }}
    >Закрыть</button>
  </div>
}