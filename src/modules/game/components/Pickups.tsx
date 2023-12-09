import React from 'react';
import { Slices } from '@/redux/gameSlice';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Pickup from './Pickup';

type Props = {
  img: HTMLImageElement;
};

const Pickups: React.FC<Props> = ({ img }) => {
  const {
    gameState: { pickups, screen },
  } = useGameSliceSelector((state: Slices) => state.game);

  return (
    <>
      {Object.keys(pickups).map((key: string) => (
        <Pickup key={pickups[key].id} pickupData={pickups[key]} scale={screen.scale} img={img} />
      ))}
    </>
  );
};

export default Pickups;
