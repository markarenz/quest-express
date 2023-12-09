import React from 'react';
import { Slices } from '@/redux/gameSlice';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Positioner from './Positioner';
import Sprite from './Sprite';

type Props = {
  img: HTMLImageElement;
};

const Player: React.FC<Props> = ({ img }) => {
  const {
    gameState: { player, screen },
  } = useGameSliceSelector((state: Slices) => state.game);

  return (
    <Positioner
      direction={player.direction}
      position={player.position}
      size={player.size}
      scale={screen.scale}
    >
      <div id="player" style={{ width: `${screen.scale}vw`, height: `${screen.scale}vw` }}>
        <Sprite slug="player" status={player.status} direction={player.direction} img={img} />
      </div>
    </Positioner>
  );
};
export default Player;
