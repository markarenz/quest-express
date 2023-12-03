import React, { useState, useEffect } from 'react';
import { useGameSliceDispatch } from '@/redux/reduxHooks'; // useGameSliceSelector
import { inputAdd, inputRemove, Slices } from '@/redux/gameSlice';
import MobilePlayerControls from './MobilePlayerControls';

const HUD = () => {
  // const {
  //   gameState: { player, entities, cameraOffset, isLevelReady, screen, isPaused },
  //   keysDown,
  // } = useGameSliceSelector((state: Slices) => state.game);
  const [img] = useState(new Image());
  const [isReady, setIsReady] = useState(false);

  const dispatch = useGameSliceDispatch();

  useEffect(() => {
    img.src = '/images/ui.png';
  }, []);

  img.onload = () => {
    setIsReady(true);
  };

  const handleMobileButtonDown = (input: string) => {
    dispatch(inputAdd(input));
  };

  const handleMobileButtonUp = (input: string) => {
    dispatch(inputRemove(input));
  };

  return (
    <div
      id="hud"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      {isReady && (
        <MobilePlayerControls
          img={img}
          handleMobileButtonDown={handleMobileButtonDown}
          handleMobileButtonUp={handleMobileButtonUp}
        />
      )}
      {/* <span style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
          {Math.floor(player.position.x)},{Math.floor(player.position.y)},{player.area}*
          {entities.length}*
        </span> */}
    </div>
  );
};
export default HUD;
