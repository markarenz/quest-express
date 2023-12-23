import React, { useState, useRef, useEffect } from 'react';
import { EffectInstance } from '@/types';
import { removeEffect } from '@/redux/gameSlice';
import { useGameSliceDispatch } from '@/redux/reduxHooks';
import { TILE_WIDTH } from '@/constants';
import Positioner from './Positioner';

type Props = {
  img: HTMLImageElement;
  effect: EffectInstance;
  scale: number;
  playSound: Function;
};

const Effect: React.FC<Props> = ({ img, effect, scale, playSound }) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef(null);
  const dispatch = useGameSliceDispatch();
  useEffect(() => {
    if (canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      if (img && canvas) {
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (context) {
          playSound();
          context.imageSmoothingEnabled = false;
          setCtx(context);
        }
      }
    }
  }, [img, playSound]);

  useEffect(() => {
    const animationFrames = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ];
    let frameIndex = 0;
    let timer: any;
    const clearTimer = () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    if (img && ctx) {
      const drawFrame = (frameX: number, frameY: number) => {
        const h = 32;
        const w = 32;
        ctx.drawImage(
          img,
          frameX * TILE_WIDTH,
          frameY * TILE_WIDTH,
          w,
          h,
          0,
          0,
          TILE_WIDTH,
          TILE_WIDTH,
        );
      };

      const step = () => {
        ctx.clearRect(0, 0, TILE_WIDTH, TILE_WIDTH);
        const [dx, dy] = animationFrames[frameIndex];
        drawFrame(dx, dy);
        frameIndex++;
        if (frameIndex >= animationFrames.length) {
          // remove this after the animation has run its course
          dispatch(removeEffect(effect.id));
        }
      };

      clearTimer();
      timer = setInterval(step, 50);
    }

    return () => {
      clearTimer();
    };
  }, [ctx, img, dispatch, effect.id]);

  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  return (
    <Positioner position={effect.position} size={{ w: 1, h: 1 }} scale={scale} isAbove>
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
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
      </div>
    </Positioner>
  );
};

const M_Effect = React.memo(Effect);
export default M_Effect;
