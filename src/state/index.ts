import { PlayersReducerState } from './PlayersReducer';

export type MainReducerType = {
  playersReducer: PlayersReducerState;
  teamsReducer: unknown;
};

export type ReducerTypes = keyof MainReducerType;
