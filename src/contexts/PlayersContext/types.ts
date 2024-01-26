import {
  PlayerReducerActions,
  PlayersReducerState,
} from '@/state/PlayersReducer';

export type PlayersProviderPropsType = {
  children: React.ReactElement | React.ReactNode;
};

export type PlayerContextValuesType = {
  dispatch: React.Dispatch<PlayerReducerActions>;
  state: PlayersReducerState;
};
