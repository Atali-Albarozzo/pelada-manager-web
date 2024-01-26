'use client';

import { PlayersProvider } from '@/contexts/PlayersContext';
import Main from './components/Main';

export default function Home() {
  return (
    <PlayersProvider>
      <Main />
    </PlayersProvider>
  );
}
