'use client';

import Game from '@/components/game/Game';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function GamePage({ params }: { params: { id: string } }) {
  return (
    <Provider store={store}>
      <main className="">
        {/* <div>Game ID: {params.id}</div> */}
        <Game />
      </main>
    </Provider>
  );
}