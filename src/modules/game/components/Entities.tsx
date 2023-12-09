import { Slices } from '@/redux/gameSlice';
import { EntityInstance } from '@/types';
import { useGameSliceSelector } from '@/redux/reduxHooks';
import Entity from './Entity';

type Props = {
  img: HTMLImageElement;
};

const Entities: React.FC<Props> = ({ img }) => {
  const {
    gameState: { entities, screen },
  } = useGameSliceSelector((state: Slices) => state.game);
  return (
    <>
      {entities.map((entityData: EntityInstance) => (
        <Entity key={entityData.id} entityData={entityData} scale={screen.scale} img={img} />
      ))}
    </>
  );
};

export default Entities;
