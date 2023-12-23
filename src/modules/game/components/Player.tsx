import React from 'react';
import { Slices } from '@/redux/gameSlice';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Positioner from './Positioner';
import Sprite from './Sprite';
import { EntityInstance, Screen } from '@/types';

type Props = {
  img: HTMLImageElement;
  player: EntityInstance;
  screen: Screen;
};

const Player: React.FC<Props> = ({ img, player, screen }) => {
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

const M_Player = React.memo(Player);
export default M_Player;
