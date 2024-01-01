interface TileProps {
  value: number;
}

const Tile = ({ value }: TileProps) => {
  return <div className={`tile tile-${value}`}>{value}</div>;
};

export default Tile;
