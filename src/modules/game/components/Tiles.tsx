import React, { useState, useEffect } from 'react';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import { Slices } from '@/redux/gameSlice';
import Tile from './Tile';

const Tiles = () => {
  const {
    gameState: { level, player, screen },
  } = useGameSliceSelector((state: Slices) => state.game);

  const [img] = useState(new Image());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    img.src = '/images/tiles-01.png'; //imageSrc;
  }, []);

  img.onload = () => {
    setIsReady(true);
  };

  const { tileMap } = level.areas[player?.area || 0];

  return !isReady ? null : (
    <>
      {Object.keys(tileMap).map((coords) => (
        <Tile
          key={coords}
          coords={coords}
          tileData={tileMap[coords]}
          scale={screen.scale}
          img={img}
        />
      ))}
    </>
  );
};

const M_Tiles = React.memo(Tiles);
export default M_Tiles;
