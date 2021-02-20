# Grid Module

This feature module contains the elements to run an display the game grid.

It is presented through the `GridComponent` to display cells. Cells will determine their content based on their grid coordinates (col, row) and the `GridState`.

The `GridState` holds the coins tha have been played already and the coins that need to be highlighted, if any.

> ### ⚠ Warning
>
> `GridState` holds the coins in a { **col**, **row** } coordinate system. While this is not the usual { row, col } model, it is more convenient to store coins that need to "fall" down their column.

The `GridState` holds coins information as id of their owner. While all columns will exist in the `gridCols` state, they will only have items where ther is a coin. In other words, it does not hold and "empty cell" value. That information is inferred if the `gridCols[col][row]` value is undefined.
