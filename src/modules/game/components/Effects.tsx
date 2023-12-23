import React from 'react';
import { Slices } from '@/redux/gameSlice';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Effect from './Effect';
import { EffectInstance, ObjectOfAudio, Screen } from '@/types';
import { playSound } from '../gameUtils';

type Props = {
  img: HTMLImageElement;
  effects: EffectInstance[];
  screen: Screen;
  sounds: ObjectOfAudio;
};

const Effects: React.FC<Props> = ({ img, effects, screen, sounds }) => {
  return (
    <>
      {effects.map((effect) => (
        <Effect
          key={effect.id}
          effect={effect}
          scale={screen.scale}
          img={img}
          playSound={() => playSound(sounds, effect.type)}
        />
      ))}
    </>
  );
};

const M_Effects = React.memo(Effects);
export default M_Effects;
