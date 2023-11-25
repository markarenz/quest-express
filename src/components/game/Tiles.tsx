import React from 'react';
import { useGameSliceSelector } from '../../redux/reduxHooks';
import { Slices } from '../../redux/gameSlice';
import Tile from './Tile';

const Tiles = () => {
  const {
    gameState: { level, player, screen },
  } = useGameSliceSelector((state: Slices) => state.game);
  const { tileMap } = level.areas[player?.area || 0];
  return (
    <>
      {Object.keys(tileMap).map((coords) => (
        <Tile key={coords} coords={coords} tileData={tileMap[coords]} scale={screen.scale} />
      ))}
    </>
  );
};

const M_Tiles = React.memo(Tiles);
export default M_Tiles;
