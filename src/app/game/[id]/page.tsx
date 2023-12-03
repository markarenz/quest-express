'use client';

import Game from '@/modules/game/components/Game';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function GamePage({ params }: { params: { id: string } }) {
  return (
    <Provider store={store}>
      <main className="">
        <Game />
      </main>
    </Provider>
  );
}
