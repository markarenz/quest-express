import React from 'react';
import { EntityType } from '../../types';

type Props = {
  entity: EntityType;
  children: JSX.Element;
};

const Positioner: React.FC<Props> = ({ children, entity }) => {
  const {
    position: { x, y },
    size: { h, w },
  } = entity;
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${Math.floor(x * 5)}vw, ${Math.floor(y * 5)}vw)`,
        zIndex: Math.floor(y * 5 + h * 5),
        height: `${h * 5}vw`,
        width: `${w * 5}vw`,
      }}
    >
      {children}
    </div>
  );
};

export default Positioner;
