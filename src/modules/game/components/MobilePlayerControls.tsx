import React from 'react';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import { Slices } from '@/redux/gameSlice';
import MobilePlayerControlsButton from './MobilePlayerControlsButton';

type Props = {
  handleMobileButtonDown: Function;
  handleMobileButtonUp: Function;
  img: HTMLImageElement;
};
const MobilePlayerControls: React.FC<Props> = ({
  handleMobileButtonDown,
  handleMobileButtonUp,
  img,
}) => {
  const {
    gameState: { player, entities, cameraOffset, isLevelReady, screen, isPaused },
    keysDown,
  } = useGameSliceSelector((state: Slices) => state.game);

  const buttonSlugs = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'space'];
  return (
    <div className="xs:display-block md:hidden absolute w-[144px] h-[144px] bottom-0 left-0">
      {buttonSlugs.map((slug) => (
        <MobilePlayerControlsButton
          key={slug}
          slug={slug}
          handleMobileButtonDown={handleMobileButtonDown}
          handleMobileButtonUp={handleMobileButtonUp}
          img={img}
          keysDown={keysDown}
        />
      ))}
    </div>
  );
};

export default MobilePlayerControls;
