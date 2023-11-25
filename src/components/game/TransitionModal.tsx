import { useEffect } from 'react';
import { useGameSliceSelector, useGameSliceDispatch } from '../../redux/reduxHooks';
import { clearTransition, setLevelArea } from '@/redux/gameSlice';
import { Slices } from '@/redux/gameSlice';

const TransitionModal = () => {
  const dispatch = useGameSliceDispatch();
  const {
    gameState: { currentTransition },
  } = useGameSliceSelector((state: Slices) => state.game);

  useEffect(() => {
    if (currentTransition) {
      const [type, valueStr] = currentTransition?.split('-') || [];

      setTimeout(() => {
        // wait
        switch (type) {
          case 'area':
            const areaNum = parseFloat(valueStr);
            dispatch(setLevelArea(areaNum));
            break;
          default:
            break;
        }

        setTimeout(() => {
          dispatch(clearTransition());
        }, 300);
      }, 300);
    }
  }, [currentTransition]);

  return (
    <div
      id="pauseModal"
      className={`absolute w-full h-full left-0 top-0 pointer-events-none transition-opacity duration-300 ${
        !currentTransition ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`absolute top-0 left-0 ${
          !currentTransition ? 'w-0' : 'w-1/2'
        } h-full bg-gray-700 transition-width duration-300`}
      />
      <div
        className={`absolute top-0 right-0 ${
          !currentTransition ? 'w-0' : 'w-1/2'
        } h-full bg-gray-700 transition-width duration-300`}
      />
    </div>
  );
};

export default TransitionModal;
