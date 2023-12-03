import { FormattedMessage } from 'react-intl';

const PauseModal = () => {
  return (
    <div
      id="pauseModal"
      className="absolute w-full h-full bg-[rgba(0,0,0,0.5)] left-0 top-0 flex justify-center items-center"
    >
      <div className="text-white text-center">
        <div className="text-xl font-bold">
          <FormattedMessage id="game__pause_modal__title" />
        </div>
        <div className="text-lg mt-2">
          <FormattedMessage id="game__pause_modal__subtitle" />
        </div>
      </div>
    </div>
  );
};

export default PauseModal;
