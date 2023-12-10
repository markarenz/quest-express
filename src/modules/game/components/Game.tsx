import { useEffect, useState, KeyboardEvent } from 'react';
import dynamic from 'next/dynamic';
import { useGameSliceSelector, useGameSliceDispatch } from '@/redux/reduxHooks';
import {
  Slices,
  inputAdd,
  inputRemove,
  processPhysics,
  setScreenDimensions,
  initArea,
} from '@/redux/gameSlice';
import { ObjectOfBooleans } from '@/types';
import { GAME_IMAGE_SRC } from '@/constants';
import { getDefaultImages, getDefaultSounds } from '../gameUtils';
import Entities from './Entities';
import Effects from './Effects';
import Pickups from './Pickups';
import Tiles from './Tiles';
import Player from './Player';
import PauseModal from './PauseModal';
import TransitionModal from './TransitionModal';
import HUD from './HUD';

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<HTMLInputElement>;
  }
}

const Game = () => {
  const {
    gameState: { cameraOffset, isLevelReady, screen, isPaused },
  } = useGameSliceSelector((state: Slices) => state.game);

  const dispatch = useGameSliceDispatch();

  const [sounds] = useState({
    ...getDefaultSounds(),
  });
  const [images] = useState({
    ...getDefaultImages(),
  });

  const playSound = (slug: string) => {
    sounds[slug].play();
  };

  const [imagesLoaded, setImagesLoaded] = useState<ObjectOfBooleans>({});
  const [imagesLoadComplete, setImagesLoadComplete] = useState<boolean>(false);

  useEffect(() => {
    const handleImageLoaded = (key: string) => {
      setImagesLoaded((prev) => {
        const newImagesLoaded = {
          ...prev,
          [key]: true,
        };
        if (Object.keys(newImagesLoaded).length === Object.keys(images).length) {
          setTimeout(() => {
            setImagesLoadComplete(true);
          }, 10);
        }
        return newImagesLoaded;
      });
    };

    Object.keys(GAME_IMAGE_SRC).forEach((key) => {
      images[key].src = GAME_IMAGE_SRC[key];
    });
    // images.tiles.src = '/images/tiles-01.png';
    // images.sprites.src = '/images/sprites-01.png';
    // images.effects.src = '/images/effects.png';
    // images.pickups.src = '/images/pickups.png';
    images.tiles.onload = () => {
      handleImageLoaded('tiles');
    };
    images.sprites.onload = () => {
      handleImageLoaded('sprites');
    };
    images.effects.onload = () => {
      handleImageLoaded('effects');
    };
    images.pickups.onload = () => {
      handleImageLoaded('pickups');
    };
  }, [images]);

  // INITIALIZE GAME COMPONENT
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenDimensions());
    };

    handleResize();
    window?.addEventListener('resize', handleResize);
    // dispatch(initLevel());
    dispatch(initArea());

    // KEYBOARD INPUT
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
      window?.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  const displayGame =
    isLevelReady && Object.keys(imagesLoaded).length === Object.keys(images).length;

  return !displayGame ? null : (
    <div
      className={`overflow-hidden relative bg-[#42393a] ${
        imagesLoadComplete ? 'opacity-1' : 'opacity-0'
      }`}
      style={{
        width: '100vw',
        height: '100svh',
      }}
    >
      <div
        className="absolute"
        style={{
          transition: 'transform 0.1s linear',
          transform: `translate(${Math.floor(cameraOffset.x * screen.scale)}vw, ${Math.floor(
            cameraOffset.y * screen.scale,
          )}vw)`,
          zIndex: 0,
        }}
      >
        <Tiles img={images.tiles} />
        <Entities img={images.sprites} />
        <Pickups img={images.pickups} />
        <Player img={images.sprites} />
        <Effects img={images.effects} playSound={playSound} />
      </div>
      <TransitionModal playSound={playSound} />
      {isPaused && <PauseModal />}
      <HUD />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Game), { ssr: false });
