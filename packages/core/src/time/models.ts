import { TIME_SCALE, TIME_SCALE_SETS } from './constants';

export type TimeScale = (typeof TIME_SCALE)[keyof typeof TIME_SCALE];
export type TimeScaleSet =
  (typeof TIME_SCALE_SETS)[keyof typeof TIME_SCALE_SETS];
