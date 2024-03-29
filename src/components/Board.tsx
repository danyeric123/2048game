import Tile from "./Tile";

//board is default 4x4
interface BoardProps {
  board: number[][];
}

const Board = ({ board }: BoardProps) => {
  const visualBoard = board[0]
    .map((_, i) => board.map((row) => row[i]))
    .reverse();

  return (
    <>
      <div className="board">
        {visualBoard.map((row: number[], x) => {
          return (
            <div key={`row-${x}`} className="row">
              {row.map((tile: number, y) => {
                return <Tile key={`${x}-${y}`} value={tile} />;
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
