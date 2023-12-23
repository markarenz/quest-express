import React from 'react';
import Pickup from './Pickup';
import { Screen, PickupInstance } from '@/types';

type Props = {
  img: HTMLImageElement;
  pickups: { [key: string]: PickupInstance };
  screen: Screen;
};

const Pickups: React.FC<Props> = React.memo(({ img, pickups, screen }) => {
  return (
    <>
      {Object.keys(pickups).map((key: string) => (
        <Pickup key={pickups[key].id} pickupData={pickups[key]} scale={screen.scale} img={img} />
      ))}
    </>
  );
});

export default Pickups;
