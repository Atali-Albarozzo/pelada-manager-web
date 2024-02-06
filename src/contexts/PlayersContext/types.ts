import { Player } from '@/models/player';
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
  drawTeams: (x: number) => DrawTeamsReturnType;
};

export type DrawTeamsReturnType = Map<number, Array<Player>> | undefined;
