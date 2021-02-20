# Ng Connect Four

Connect 4 game in the browser made with Angular.

## Rules

Two players play coins in turn in a 6 x 7 vertical grid and try to connect 4 of their coins in either direction (horizontal, vertical and diagonal) to win the game. The coins are "dropped" in a column of your choice and stack until the column is full. If the board is filled without any player managing to connect 4 coins, the game is a draw.

Play now: [moutah.github.io/ng-connect-four](https://moutah.github.io/ng-connect-four/)

---

## Running the game yourself

To run the game from your machine, download/clone this repo and run `npm install` to install all dependencies.

Once done, you can run `npm run start` to start the Angular development server and access the game on [localhost:4200](http://localhost:4200).

### Going further

To run unit tests, run `npm run test:ci` for a single execution or `npm run test` for watch mode.

To build the project, run `npm run build`. Use the `--prod` flag for a production build. The compiled files are then available in the `/dist` folder.
