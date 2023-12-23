import React from 'react';
import Pickup from './Pickup';
import { Screen, PickupInstance } from '@/types';

type Props = {
  img: HTMLImageElement;
  pickups: { [key: string]: PickupInstance };
  screen: Screen;
};

const Pickups: React.FC<Props> = ({ img, pickups, screen }) => {
  return (
    <>
      {Object.keys(pickups).map((key: string) => (
        <Pickup key={pickups[key].id} pickupData={pickups[key]} scale={screen.scale} img={img} />
      ))}
    </>
  );
};

const M_Pickups = React.memo(Pickups);
export default M_Pickups;
