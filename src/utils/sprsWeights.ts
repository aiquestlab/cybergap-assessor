
// This file is maintained for backward compatibility
// It re-exports all functionality from the newly organized modules

export { 
  controlIdMapping,
  controlWeights,
  getControlWeight,
  getMaxSPRSScore,
  getMinSPRSScore
} from './sprs';

export type { ControlWeight } from './sprs';
