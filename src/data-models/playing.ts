import { Track } from './track';

export class Playing {
  track: Track;
  paused: boolean;
  context: {
    type: string;
    id: string;
  };
}
