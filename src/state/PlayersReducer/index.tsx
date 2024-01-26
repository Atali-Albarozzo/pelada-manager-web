import { Player } from '@/models/player';
import { setStorage } from '@/utils/core';

export type PlayersReducerState = {
  players: Array<Player>;
};

export enum PlayerReducerActionTypes {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  FETCH = 'FETCH',
}

export type PlayerReducerActions = {
  type: PlayerReducerActionTypes;
  payload: { data: Player | Array<Player> };
};

function PlayersReducer(
  state: PlayersReducerState,
  action: PlayerReducerActions
): PlayersReducerState {
  switch (action.type) {
    case PlayerReducerActionTypes.ADD: {
      const result = {
        ...state,
        players: [
          ...state.players,
          ...(Array.isArray(action.payload.data)
            ? action.payload.data
            : [action.payload.data]),
        ],
      };

      setStorage('playersReducer', result);
      return result;
    }
    case PlayerReducerActionTypes.EDIT: {
      if (Array.isArray(action.payload.data)) {
        throw new Error(
          'Array of players is not allowed for this action type.'
        );
      }

      const result = {
        ...state,
        players: state.players.map((player) =>
          player.id === (action.payload.data as Player).id
            ? action.payload.data
            : player
        ) as Player[],
      };

      setStorage('playersReducer', result);
      return result;
    }
    case PlayerReducerActionTypes.DELETE: {
      if (Array.isArray(action.payload.data)) {
        throw new Error(
          'Array of players is not allowed for this action type.'
        );
      }

      const result = {
        ...state,
        players: state.players.filter(
          (player) => player.id !== (action.payload.data as Player).id
        ),
      };

      setStorage('playersReducer', result);
      return result;
    }
    case PlayerReducerActionTypes.FETCH: {
      const result = {
        ...state,
        players: action.payload.data as Player[],
      };
      setStorage('playersReducer', result);
      return result;
    }
    default:
      throw new Error('Not a valid reducer action type for PlayerReducer');
  }
}

export default PlayersReducer;
