'use client';

import React, { useContext, useEffect, useReducer } from 'react';
import {
  PlayerContextValuesType,
  PlayersProviderPropsType,
  DrawTeamsReturnType,
} from './types';
import PlayersReducer, {
  PlayerReducerActionTypes,
} from '@/state/PlayersReducer';
import { PELADA_MANAGER_STATE } from '@/constants/localStorage';
import { MainReducerType } from '@/state';
import { Player } from '@/models/player';

const PlayersContext = React.createContext<PlayerContextValuesType | null>(
  null
);

const initialState = {
  players: [],
};

function PlayersProvider({ children }: PlayersProviderPropsType) {
  const [state, dispatch] = useReducer(PlayersReducer, initialState);

  useEffect(() => {
    dispatch({
      type: PlayerReducerActionTypes.FETCH,
      payload: {
        data:
          (
            JSON.parse(
              localStorage.getItem(PELADA_MANAGER_STATE) || '{}'
            ) as MainReducerType
          )?.playersReducer?.players || [],
      },
    });
  }, []);

  function drawTeams(playersByTeam: number): DrawTeamsReturnType {
    if (!state.players.length) {
      throw new Error(
        'Parece que não temos jogadores ainda. Cadastre alguns e tente novamente.'
      );
    }

    let activePlayers = state.players.filter((p) => p.active);

    if (!activePlayers) {
      throw new Error('Não temos ninguém confirmado pra pelada hoje.');
    }

    const teams: Map<number, Array<Player>> = new Map();
    const totalTeams =
      activePlayers.length <= playersByTeam
        ? 1
        : Math.ceil(activePlayers.length / playersByTeam);

    for (let x = 0; x < totalTeams; x++) {
      const playerIndexes = getRandomPlayersIndexes(
        playersByTeam < activePlayers.length
          ? playersByTeam
          : activePlayers.length,
        activePlayers.length
      );

      const newPlayers = activePlayers.filter((p, index) =>
        playerIndexes.includes(index)
      );

      teams.set(x + 1, newPlayers);

      // clean up active players
      activePlayers = activePlayers.filter(
        (p, index) => !playerIndexes.includes(index)
      );
    }

    return teams;
  }

  function getRandomPlayersIndexes(total: number, numOfPlayers: number) {
    const indexes: number[] = [];

    do {
      const idx = Math.floor(Math.random() * numOfPlayers);

      if (indexes.includes(idx)) {
        continue;
      }

      indexes.push(idx);
    } while (indexes.length < total);

    return indexes;
  }

  return (
    <PlayersContext.Provider value={{ state, dispatch, drawTeams }}>
      {children}
    </PlayersContext.Provider>
  );
}

function usePlayers() {
  const context = useContext(PlayersContext);

  if (!context) {
    throw new Error('usePlayers hook must be used within PlayerProvider.');
  }

  return context;
}

export { PlayersProvider, usePlayers };
