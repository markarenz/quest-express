import React from 'react';
import { EntityInstance, Screen } from '@/types';
import Entity from './Entity';

type Props = {
  img: HTMLImageElement;
  entities: EntityInstance[];
  screen: Screen;
};

const Entities: React.FC<Props> = ({ img, entities, screen }) => {
  return (
    <>
      {entities.map((entityData: EntityInstance) => (
        <Entity key={entityData.id} entityData={entityData} scale={screen.scale} img={img} />
      ))}
    </>
  );
};

const M_Entities = React.memo(Entities);
export default M_Entities;
