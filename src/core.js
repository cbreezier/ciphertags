import {Map, List, fromJS} from 'immutable';

let wordList = require('./words.json');

function otherTeam(team) {
  return team === Game.TEAM_RED ? Game.TEAM_BLUE : Game.TEAM_RED;
}

function leaveAll(players, player) {
  // Remove from mastermind role in other team if mastermind
  // Remove from a team's agents if currently so
  [Game.TEAM_RED, Game.TEAM_BLUE].forEach(team => {
    players = Game.leaveTeam(players, team, player);
    players = Game.unsetMastermind(players, team, player);
  });
  return players;
}

let Game = {
  /*
   * Represents the game state, which looks something like:
   *
   * {
   *   players: {
   *     red: {
   *       agents: ['bob', 'emily'],
   *       mastermind: 'arthur'     // Not present if no mastermind set
   *     },
   *     blue: {
   *       agents: ['ben', 'emma'],
   *       mastermind: 'austin'     // Not present if no mastermind set
   *     }
   *   },
   *   cards: [
   *     {
   *       word: 'rat',
   *       team: 'red|blue|assassin|civilian',
   *       revealed: true|false
   *     }
   *   ],
   *   turn: {
   *     turnNumber: 0,
   *     team: 'red|blue',
   *     prompt: {                  // Not present if no prompt set
   *       word: 'animals',
   *       limit: 2
   *     },
   *     guesses: 1                 // Not present if no prompt set
   *   }
   * }
   *
   */

  TEAM_RED: 'red',
  TEAM_BLUE: 'blue',
  ASSASSIN: 'assassin',
  CIVILIAN: 'civilian',

  setCards: (game, cards) => {
    return game.set('cards', cards);
  },

  joinTeam: (players, team, player) => {
    players = leaveAll(players, player);
    
    return players.updateIn([team, 'agents'],
      List(),
      agents => agents.push(player)
    );
  },

  leaveTeam: (players, team, player) => {
    if (players.getIn([team, 'agents'], List()).includes(player)) {
      players = players.updateIn([team, 'agents'],
        List(),
        agents => agents.filter(agent => agent !== player)
      );
    }
    return players;
  },

  setMastermind: (players, team, player) => {
    if (!players.hasIn([team, 'mastermind'])) {
      players = leaveAll(players, player);
      // Set mastermind to player
      players = players.setIn([team, 'mastermind'], player);
    }

    return players;
  },

  unsetMastermind: (players, team, player) => {
    if (players.getIn([team, 'mastermind']) === player) {
      players = players.deleteIn([team, 'mastermind']);
    }

    return players;
  },

  setWinner: (game, team) => {
    return game.remove('turn')
               .set('winner', team)
               .update('cards', cards => cards.map(card => card.update('revealed', () => true)));
  },

  revealCard: (game, index) => {
    const card = game.get('cards').get(index);
    const turn = game.get('turn');

    if (card.get('revealed') === true) {
      return game;
    }

    game = game.update('cards', cards => cards.update(index, card => card.update('revealed', () => true)));

    if (card.get('team') === turn.get('team')) {
      game = game.updateIn(['turn', 'guesses'], guesses => guesses + 1);
      if (game.getIn(['turn', 'guesses']) > game.getIn(['turn', 'prompt', 'limit'])) {
        game = game.update('turn', Game.nextTurn);
      }
    } else if (card.get('team') === Game.ASSASSIN) {
      game = setWinner(game, otherTeam(turn.get('team')));
    } else {
      game = game.update('turn', Game.nextTurn);
    }

    // TODO check if someone won

    return game;
  },

  nextTurn: (turn) => {
    return turn.remove('prompt')
               .remove('guesses')
               .update('turnNumber', turnNumber => turnNumber + 1)
               .update('team', team => otherTeam(team));
  },

  setPrompt: (turn, word, limit) => {
    if (!turn.has('prompt')) {
      return turn.set('prompt', fromJS({
        word: word,
        limit: limit
      })).set('guesses', 0);
    }

    return turn;
  }
}

export {
  Game
}

/**
 * From http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 */
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function generateRandomCards() {
  shuffle(wordList);

  let words = [];

  let teams = [{
    name: Game.TEAM_RED,
    number: 8
  }, {
    name: Game.TEAM_BLUE,
    number: 7
  }, {
    name: Game.ASSASSIN,
    number: 1
  }, {
    name: Game.CIVILIAN,
    number: 9
  }];

  let ptr = 0;
  teams.forEach(team => {
    for (let i = 0; i < team.number; i++) {
      words.push({
        word: wordList[ptr++],
        team: team.name,
        revealed: false
      });
    }
  });

  shuffle(words);

  return fromJS(words);
}

export const INITIAL_STATE = Map({
  cards: generateRandomCards(),
  players: Map({
    red: Map({
      agents: List()
    }),
    blue: Map({
      agents: List()
    })
  }),
  turn: Map({
    turnNumber: 0,
    team: Game.TEAM_RED
  })
});
