'use client';

import React, { useContext, useEffect, useReducer } from 'react';
import { PlayerContextValuesType, PlayersProviderPropsType } from './types';
import PlayersReducer, {
  PlayerReducerActionTypes,
} from '@/state/PlayersReducer';
import { PELADA_MANAGER_STATE } from '@/constants/localStorage';
import { MainReducerType } from '@/state';

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

  return (
    <PlayersContext.Provider value={{ state, dispatch }}>
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
