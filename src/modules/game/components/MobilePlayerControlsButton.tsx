import React, { useRef, useEffect } from 'react';
import { ObjectOfBooleans, Vector } from '@/types';

type ButtonDefinition = {
  default: { x: number; y: number };
  active: { x: number; y: number };
  keyToCheck: string;
  position: Vector;
};
type ButtonDefinitions = { [key: string]: ButtonDefinition };

const buttonDefs: ButtonDefinitions = {
  arrowup: {
    default: {
      x: 0,
      y: 0,
    },
    active: {
      x: 1,
      y: 0,
    },
    position: {
      x: 48,
      y: 0,
    },
    keyToCheck: 'up',
  },
  arrowdown: {
    default: {
      x: 0,
      y: 1,
    },
    active: {
      x: 1,
      y: 1,
    },
    position: {
      x: 48,
      y: 96,
    },
    keyToCheck: 'down',
  },
  arrowleft: {
    default: {
      x: 2,
      y: 1,
    },
    active: {
      x: 3,
      y: 1,
    },
    position: {
      x: 0,
      y: 48,
    },
    keyToCheck: 'left',
  },
  arrowright: {
    default: {
      x: 2,
      y: 0,
    },
    active: {
      x: 3,
      y: 0,
    },
    position: {
      x: 96,
      y: 48,
    },
    keyToCheck: 'right',
  },
  space: {
    default: {
      x: 4,
      y: 0,
    },
    active: {
      x: 5,
      y: 0,
    },
    position: {
      x: 48,
      y: 48,
    },
    keyToCheck: 'action',
  },
};

type Props = {
  slug: string;
  img: HTMLImageElement;
  handleMobileButtonDown: Function;
  handleMobileButtonUp: Function;
  keysDown: ObjectOfBooleans;
};

const MobilePlayerControlsButton: React.FC<Props> = ({
  slug,
  img,
  handleMobileButtonDown,
  handleMobileButtonUp,
  keysDown,
}) => {
  const canvasRef = useRef(null);

  const btnDef = buttonDefs[slug];

  const isActive = Object.hasOwn(keysDown, btnDef.keyToCheck);

  const btnSpriteSize = 16;
  const btnDisplaySize = 48;

  useEffect(() => {
    const drawButton = (canvas: HTMLCanvasElement) => {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, btnSpriteSize, btnSpriteSize);
        ctx.imageSmoothingEnabled = false;
        const framePosition = btnDef[isActive ? 'active' : 'default'];
        ctx.drawImage(
          img,
          framePosition.x * btnSpriteSize,
          framePosition.y * btnSpriteSize,
          btnSpriteSize,
          btnSpriteSize,
          0,
          0,
          btnDisplaySize,
          btnDisplaySize,
        );
      }
    };

    if (canvasRef.current) {
      drawButton(canvasRef.current);
    }
  }, [isActive, img]);

  return (
    <button
      role="button"
      onTouchStart={() => handleMobileButtonDown(slug)}
      onTouchEnd={() => handleMobileButtonUp(slug)}
      onTouchMove={() => handleMobileButtonUp(slug)}
      className={`absolute w-[48px] h-[48px]`}
      style={{
        left: btnDef.position.x,
        top: btnDef.position.y,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
        width={`${btnDisplaySize}`}
        height={`${btnDisplaySize}`}
      />
    </button>
  );
};

export default MobilePlayerControlsButton;
