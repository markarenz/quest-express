import React from 'react';
import { DIRECTIONS, ENTITY_STATUSES, PickupInstance } from '@/types';
import Sprite from './Sprite';
import Positioner from './Positioner';

type Props = {
  pickupData: PickupInstance;
  scale: number;
  img: HTMLImageElement;
};

const Pickup: React.FC<Props> = ({ pickupData, scale, img }) => {
  return (
    <Positioner position={pickupData.position} size={pickupData.size} scale={scale}>
      <Sprite slug={pickupData.type} status={ENTITY_STATUSES.IDLE} img={img} />
    </Positioner>
  );
};

export default Pickup;
