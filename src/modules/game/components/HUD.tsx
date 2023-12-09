import React, { useState, useEffect } from 'react';
import { useGameSliceDispatch } from '@/redux/reduxHooks'; // useGameSliceSelector
import { inputAdd, inputRemove, Slices } from '@/redux/gameSlice';
import MobilePlayerControls from './MobilePlayerControls';

const HUD = () => {
  const [img] = useState(new Image());
  const [isReady, setIsReady] = useState(false);

  const dispatch = useGameSliceDispatch();

  useEffect(() => {
    img.src = '/images/ui.png';
  }, [img]);

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
    </div>
  );
};
export default HUD;
