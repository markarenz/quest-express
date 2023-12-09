import React from 'react';
import { Slices } from '@/redux/gameSlice';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Effect from './Effect';
import { EffectInstance } from '@/types';

type Props = {
  img: HTMLImageElement;
};

const Effects: React.FC<Props> = ({ img }) => {
  const {
    gameState: { effects, screen },
  } = useGameSliceSelector((state: Slices) => state.game);

  return (
    <>
      {effects.map((effect) => (
        <Effect key={effect.id} effect={effect} scale={screen.scale} img={img} />
      ))}
    </>
  );
};

export default Effects;
