import dynamic from 'next/dynamic';
import { useEffect, KeyboardEvent } from 'react';
import { useGameSliceSelector, useGameSliceDispatch } from '../../redux/reduxHooks';
import {
  Slices,
  inputAdd,
  inputRemove,
  processPhysics,
  setAspectRatio,
  initLevel,
} from '../../redux/gameSlice';
import Positioner from './Positioner';
import Tiles from './Tiles';
import Sprite from './Sprite';
import Entity from './Entity';

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<HTMLInputElement>;
  }
}

const Game = () => {
  const {
    gameState: { player, entities, cameraOffset, isLevelReady },
  } = useGameSliceSelector((state: Slices) => state.game);
  const dispatch = useGameSliceDispatch();

  // const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(processPhysics());
    }, 33);

    const handleKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
      dispatch(inputAdd(event.key.toLowerCase()));
    };

    const handleKeyup = (event: any) => {
      dispatch(inputRemove(event.key.toLowerCase()));
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setAspectRatio());
    };

    handleResize();
    window?.addEventListener('resize', handleResize);
    dispatch(initLevel());
    return () => {
      window?.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#42393a',
        opacity: isLevelReady ? 1 : 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          // top: `${cameraOffset.y * 5}vw`,
          // left: `${cameraOffset.x * 5}vw`,
          transform: `translate(${Math.floor(cameraOffset.x * 5)}vw, ${Math.floor(
            cameraOffset.y * 5,
          )}vw)`,
          backgroundColor: 'yellow',
          zIndex: 0,
        }}
      >
        <Tiles />

        {entities.map((entityData) => (
          <Entity key={entityData.id} entityData={entityData} />
        ))}
        <Positioner entity={player}>
          <div style={{ width: '5vw', height: '5vw' }}>
            <Sprite slug="player" status={player.status} direction={player.direction} />
          </div>
        </Positioner>
      </div>
      <div
        id="hud"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
          textAlign: 'right',
        }}
      >
        <span style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
          {Math.floor(player.position.x)},{Math.floor(player.position.y)}
        </span>
      </div>
    </div>
  );
};

// export default Game;
export default dynamic(() => Promise.resolve(Game), { ssr: false });
