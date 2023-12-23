import React from 'react';
import { EntityInstance, Screen } from '@/types';
import Entity from './Entity';

type Props = {
  img: HTMLImageElement;
  entities: EntityInstance[];
  screen: Screen;
};

const Entities: React.FC<Props> = React.memo(({ img, entities, screen }) => {
  return (
    <>
      {entities.map((entityData: EntityInstance) => (
        <Entity key={entityData.id} entityData={entityData} scale={screen.scale} img={img} />
      ))}
    </>
  );
});

export default Entities;
