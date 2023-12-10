import React from 'react';
import { Slices } from '@/redux/gameSlice';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Effect from './Effect';
import { EffectInstance } from '@/types';

type Props = {
  img: HTMLImageElement;
  playSound: Function;
};

const Effects: React.FC<Props> = ({ img, playSound }) => {
  const {
    gameState: { effects, screen },
  } = useGameSliceSelector((state: Slices) => state.game);

  return (
    <>
      {effects.map((effect) => (
        <Effect
          key={effect.id}
          effect={effect}
          scale={screen.scale}
          img={img}
          playSound={playSound}
        />
      ))}
    </>
  );
};

export default Effects;
