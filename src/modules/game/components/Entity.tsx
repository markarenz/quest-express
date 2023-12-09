import React from 'react';
import { EntityInstance } from '@/types';
import Positioner from './Positioner';
import Sprite from './Sprite';

type Props = {
  entityData: EntityInstance;
  scale: number;
  img: HTMLImageElement;
};

const Entity: React.FC<Props> = ({ entityData, scale, img }) => {
  return (
    <Positioner
      direction={entityData.direction}
      position={entityData.position}
      size={entityData.size}
      scale={scale}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: entityData.isActive ? 1.0 : 0.5,
        }}
      >
        <Sprite slug={entityData.type} status={entityData.status} img={img} />
      </div>
    </Positioner>
  );
};

export default Entity;
