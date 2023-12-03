import React, { useRef, useEffect } from 'react';
import { TileInstance, TileDef } from '@/types';
import { tileDefs, TILE_WIDTH } from '@/constants';

type Props = {
  coords: string;
  tileData: TileInstance;
  scale: number;
  img: HTMLImageElement;
};

const Tile: React.FC<Props> = ({ coords, tileData, scale, img }) => {
  const canvasRef = useRef(null);
  // const canvasRefOverlay = useRef(null);

  const width = TILE_WIDTH;
  const height = TILE_WIDTH;

  const [xStr, yStr] = coords.split(',');
  const x = parseFloat(xStr);
  const y = parseFloat(yStr);

  useEffect(() => {
    const drawTileImage = (canvas: HTMLCanvasElement, tileDef: TileDef) => {
      if (canvas) {
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          ctx.imageSmoothingEnabled = false;
          const frameX = tileDef.spritePosition.x;
          const frameY = tileDef.spritePosition.y;
          ctx.drawImage(
            img,
            frameX * width,
            frameY * height,
            TILE_WIDTH,
            TILE_WIDTH,
            0,
            0,
            TILE_WIDTH,
            TILE_WIDTH,
          );

          if (tileData.overlay) {
            ctx.drawImage(
              img,
              tileDefs[tileData.overlay]?.spritePosition.x * width,
              tileDefs[tileData.overlay]?.spritePosition.y * height,
              TILE_WIDTH,
              TILE_WIDTH,
              0,
              0,
              TILE_WIDTH,
              TILE_WIDTH,
            );
          }
        }
      }
    };

    if (canvasRef.current) {
      drawTileImage(canvasRef.current, tileDefs[tileData.type]);
    }
  }, [tileData, height, width]);

  if (!tileDefs[tileData.type]) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${Math.floor(x * scale)}vw, ${Math.floor(y * scale)}vw)`,
        height: `${scale}vw`,
        width: `${scale}vw`,
        zIndex: tileDefs[tileData.type].walkable ? 0 : Math.floor((y + 1) * scale),
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
        width={`${TILE_WIDTH}`}
        height={`${TILE_WIDTH}`}
      />
      {/* {tileData.overlay && (
        <canvas
          ref={canvasRefOverlay}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated',
            opacity: tileData.overlay.includes('shadow') ? 0.5 : 1,
          }}
          width={`${TILE_WIDTH}`}
          height={`${TILE_WIDTH}`}
        />
      )} */}
    </div>
  );
};

const M_Tile = React.memo(Tile);
export default M_Tile;
