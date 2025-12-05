import { BerryCard } from '../BerryCard'

export const FeedModal = () => {
  return (
    <div style={{
      display: "flex",
      flexWrap: 'wrap',
      width: '524px',
      height: '240px',
      gap: '12px',
      overflowY: 'scroll',
    }}
    ><BerryCard />
    <BerryCard />
    <BerryCard />
    </div>
  )
}