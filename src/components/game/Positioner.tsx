import React from 'react';
import { EntityType } from '../../types';

type Props = {
  entity: EntityType;
  children: JSX.Element;
  scale: number;
};
// TODO: we support negative Y values above -50

const Positioner: React.FC<Props> = ({ children, entity, scale }) => {
  const {
    position: { x, y },
    size: { h, w },
  } = entity;
  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${Math.floor(x * scale)}vw, ${Math.floor(y * scale)}vw)`,
        zIndex: Math.floor((y + 50) * scale + h * scale),
        height: `${h * scale}vw`,
        width: `${w * scale}vw`,
      }}
    >
      {children}
    </div>
  );
};

export default Positioner;
