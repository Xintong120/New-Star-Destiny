import type { PalaceStar } from './PalaceStar';

/**
 * 宫位接口
 */
export interface Palace {
  name: string;
  stem: string;
  branch: string;
  isBodyPalace: boolean;
  majorStars?: PalaceStar[];
  minorStars?: PalaceStar[];
  miscStars?: string[];
}
