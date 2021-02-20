# Game Module

This feature module contains the elements to run and orchestrate the game.

It is presented through the `GameComponent` view that holds the sub-views such as player settings and the game grid.

The game is manipulated via the `GameService`. It provides function to setup and start the game as well as playing coins.

Finally, the `GameState` is a store feature that holds information on the players, and game status (start time and if it is over).

## Lifecycle of a game

### 1. `setup()`

The game needs to be setup by passing 2 `Player` objects. Upon setup, the player that will start is choosed randomly.

### 2. `start()`

Resets the grid and starts the game.

### 3. `play()`

Play coins in specified column. Will automatically attribute the coin to the player that is active in the store. After a play has been made, the service checks if the newly added coin completes a serie of 4. If so, the active player is declared winner and the game is stope. Alternatively, if the coin filled the last free cell of the grid, the game is ended as a draw.

### 4. `clear()`

Upon leaving the game, clear all data to make room for a new game.
