'use client';

import Button from '@/components/button';
import React, { useEffect, useState } from 'react';
import PlayerItem from '../PlayerItem';
import { usePlayers } from '@/contexts/PlayersContext';

import { Player } from '@/models/player';

export default function Main() {
  const { state, drawTeams } = usePlayers();

  const [playersList, setPlayersList] = useState<Array<Player>>(
    state.players || []
  );
  const [teams, setTeams] = useState<Map<number, Array<Player>>>(new Map());
  const [showTeams, setShowTeams] = useState<boolean>(false);

  useEffect(() => {
    setPlayersList(state.players);
  }, [state.players]);

  function addPlayer() {
    setPlayersList([...state.players, { id: '', name: '' }]);
  }

  function handleDrawTeams() {
    try {
      const teams = drawTeams(5);

      if (teams && teams.size) {
        setTeams(teams);
        setShowTeams(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <main className='flex min-h-screen flex-col mt-14 p-4 mb-[96px]'>
        {showTeams ? (
          <section>
            {/* @ts-ignore */}
            {[...teams.entries()].map(([key, value]) => {
              return (
                <ul key={key}>
                  <h1>Time {key}</h1>
                  {value.map((player: Player) => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              );
            })}
          </section>
        ) : (
          <section>
            <h2 className='mb-4'>Craques</h2>
            <ul>
              {playersList.map((player, index) => (
                <PlayerItem
                  key={index}
                  number={index + 1}
                  player={player}
                  newPlayer={!player.id}
                  onCancelNewPlayer={() =>
                    setPlayersList(playersList.slice(0, playersList.length - 1))
                  }
                />
              ))}
            </ul>
          </section>
        )}
      </main>
      <footer className='flex justify-evenly items-center fixed bottom-0 bg-white border-t border-t-gray-300 h-24 w-screen px-4'>
        {showTeams ? (
          <Button onClick={() => setShowTeams(false)} variant='secondary'>
            VOLTAR
          </Button>
        ) : (
          <>
            <Button onClick={handleDrawTeams} style={{ marginRight: 12 }}>
              SORTEAR TIMES
            </Button>
            <Button variant='secondary' onClick={addPlayer}>
              NOVO JOGADOR
            </Button>
          </>
        )}
      </footer>
    </>
  );
}
