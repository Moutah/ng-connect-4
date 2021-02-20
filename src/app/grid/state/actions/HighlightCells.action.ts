import { GridCoord } from '../../grid-coords';
export class HighlightCells {
  static readonly type = '[Grid] Highlight cells';
  constructor(public cells: GridCoord[]) {}
}
