import React from 'react';
import { EntityType } from '../../types';
import Positioner from './Positioner';
import Sprite from './Sprite';

type Props = {
  entityData: EntityType;
};

const Entity: React.FC<Props> = ({ entityData }) => {
  return (
    <Positioner entity={entityData} key={entityData.id}>
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: entityData.isActive ? 1.0 : 0.5,
        }}
      >
        <Sprite slug={entityData.type} status={entityData.status} />
      </div>
    </Positioner>
  );
};

export default Entity;