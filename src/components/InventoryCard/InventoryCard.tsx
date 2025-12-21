export interface InventoryCardData {
  id: string;
  type: string;
  position: number;
  width?: number;
  height?: number;
  imageUrl: string;
}

interface InventoryCardProps {
  item: InventoryCardData;
  cellSize: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, itemId: string) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({
  item,
  cellSize,
  onDragStart,
  onDragEnd,
}) => {

  const width = (item.width || 1) * cellSize;
  const height = (item.height || 1) * cellSize;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, item.id)}
      onDragEnd={onDragEnd}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        cursor: 'move',
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.type}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      />
    </div>
  );
};