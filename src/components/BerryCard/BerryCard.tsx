import Berry from './BerryCardImage/Berry.png'

export const BerryCard = () => {
  return <div style={{
    display: 'flex',
    width: '220px',
    height: '165px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '16px',
    padding: '12px',
    gap: '10px',
    boxShadow: '0px 0px 16px 0px rgba(58, 58, 58, 0.1)',
  }}>
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'space-around',
    }}>
      <div>
        <img src={Berry}
          alt='Berry'
          width='59px'
          height='59px'
        />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
        <div style = {{
          fontWeight: 700,
          fontSize: "16px",
        }}>Ягода I уровня</div>
        <div>Накорми ей покемона для увеличения веса на 0,1 кг</div>
      </div>
    </div>
    <div>
      <button style={{
        width: '232px',
        height: '32px',
        backgroundColor: 'rgba(54, 95, 172, 1)',
        color: 'rgba(255, 255, 255, 1)',
      }}>Накормить</button>
    </div>
  </div>
}