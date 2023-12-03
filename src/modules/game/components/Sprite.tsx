import React, { useRef, useState, useEffect } from 'react';
import { Vector, ENTITY_STATUSES } from '@/types';
import { entityDefs, TILE_WIDTH, SPRITE_FRAMES } from '@/constants';

// MOVE THESE
const getDirectionSlug = (direction: Vector): string => {
  return direction.x === 0 && direction.y === 0
    ? 'down'
    : direction.x === 0 && direction.y <= 0
      ? 'up'
      : direction.x === 0 && direction.y >= 0
        ? 'down'
        : direction.x < 0
          ? 'left'
          : 'right';
};

type Props = {
  slug: string;
  status: ENTITY_STATUSES;
  direction?: Vector;
};
const Sprite: React.FC<Props> = ({ slug, status, direction }) => {
  const [isReady, setIsReady] = useState(false);
  const [img] = useState(typeof window === 'undefined' ? null : new Image());
  const [directionSlug, setDirectionSlug] = useState(
    direction ? getDirectionSlug(direction) : 'none',
  );
  const [animationFrames, setAnimationFrames] = useState(
    SPRITE_FRAMES[slug][status][directionSlug],
  );
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const canvasRef = useRef(null);

  const width = TILE_WIDTH;
  const height = TILE_WIDTH;

  useEffect(() => {
    if (direction) {
      setDirectionSlug(getDirectionSlug(direction));
    }
  }, [direction]);

  useEffect(() => {
    setAnimationFrames(SPRITE_FRAMES[slug][status][directionSlug]);
  }, [status, directionSlug, slug]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      if (img && canvas) {
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (context) {
          context.imageSmoothingEnabled = false;
          setCtx(context);
          img.src = '/images/sprites-01.png';
          img.onload = () => {
            setIsReady(true);
          };
        }
      }
    }
  }, [img]);

  useEffect(() => {
    let frameIndex = 0;
    let timer: any;
    const clearTimer = () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    if (img && isReady && ctx) {
      const drawFrame = (frameX: number, frameY: number) => {
        const h = entityDefs[slug].size.h * TILE_WIDTH;
        const w = entityDefs[slug].size.w * TILE_WIDTH;
        ctx.drawImage(img, frameX * width, frameY * height, w, h, 0, 0, TILE_WIDTH, TILE_WIDTH);
      };

      const step = () => {
        ctx.clearRect(0, 0, width, height);
        const [dx, dy] = animationFrames[frameIndex];
        drawFrame(dx, dy);
        frameIndex++;
        if (frameIndex >= animationFrames.length) {
          frameIndex = 0;
        }
      };

      if (animationFrames.length === 1) {
        ctx.clearRect(0, 0, width, height);
        drawFrame(animationFrames[0][0], animationFrames[0][1]);
      } else {
        clearTimer();
        timer = setInterval(step, 100);
      }
    }
    return () => {
      clearTimer();
    };
  }, [animationFrames, isReady, ctx, img, slug, height, width]);

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
      }}
      width={`${TILE_WIDTH}`}
      height={`${TILE_WIDTH}`}
    />
  );
};

const M_Sprite = React.memo(Sprite);
export default M_Sprite;
