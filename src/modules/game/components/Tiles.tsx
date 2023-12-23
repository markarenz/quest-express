import React from 'react';
import Tile from './Tile';
import { Level, Screen, EntityInstance } from '@/types';

type Props = {
  img: HTMLImageElement;
  level: Level;
  player: EntityInstance;
  screen: Screen;
};

const Tiles: React.FC<Props> = ({ img, level, player, screen }) => {
  const { tileMap } = level.areas[player?.area || 0];

  return (
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
