export const ShopCard = ({ image, tittle, text, money }: { image: string, tittle: string, text: string, money: number }) => {
  return <div style={{
    display: 'flex',
    width: '296px',
    height: '105px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '16px',
    marginTop: '16px',
    padding: '2px',
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
        <img src={image}
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
        }}>{tittle}</div>
        <div>{text}г</div>
      </div>
    </div>
    <div>
      <button style={{
        width: '232px',
        height: '32px',
        backgroundColor: 'rgba(54, 95, 172, 1)',
        color: 'rgba(255, 255, 255, 1)',
      }}>Купить за {money}</button>
    </div>
  </div>
}