import React from 'react';
import { Vector, Size } from '@/types';
import { DIRECTIONS } from '@/types';

type Props = {
  direction?: Vector;
  position: Vector;
  size: Size;
  children: JSX.Element;
  scale: number;
  isAbove?: boolean;
};
// TODO: we support negative Y values above -50

const Positioner: React.FC<Props> = ({
  children,
  direction,
  position: { x, y },
  size: { h, w },
  scale,
  isAbove,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        transition: direction ? 'none' : 'transform 0.1s linear',
        transform: `translate(${Math.floor(x * scale)}vw, ${Math.floor(y * scale)}vw)`,
        zIndex: isAbove ? 2147483647 : Math.floor((y + 50) * scale + h * scale),
        height: `${h * scale}vw`,
        width: `${w * scale}vw`,
      }}
    >
      {children}
    </div>
  );
};

export default Positioner;
