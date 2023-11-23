import React from 'react';
import { useGameSliceSelector } from '../../redux/reduxHooks';
import { Slices } from '../../redux/gameSlice';
import Tile from './Tile';

const Tiles = () => {
  const {
    gameState: { level },
  } = useGameSliceSelector((state: Slices) => state.game);
  return (
    <>
      {Object.keys(level).map((coords) => (
        <Tile key={coords} coords={coords} tileData={level[coords]} />
      ))}
    </>
  );
};

const M_Tiles = React.memo(Tiles);
export default M_Tiles;
