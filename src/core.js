import {Map, List, fromJS} from 'immutable';

function otherTeam(team) {
  return team === Game.TEAM_RED ? Game.TEAM_BLUE : Game.TEAM_RED;
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
    return players.updateIn([team, 'agents'],
      List(),
      agents => agents.push(player)
    );
  },

  setMastermind: (players, team, player) => {
    if (!players.hasIn([team, 'mastermind'])) {
      let agents = players.getIn([team, 'agents'])
      if (agents && agents.includes(player)) {
        // Remove player from agents list
        players = players.updateIn(
          [team, 'agents'],
          agents => agents.filter(agent => agent !== player)
        )
        // Set mastermind to player
        players = players.setIn([team, 'mastermind'], player);
      }
    }

    return players;
  },

  unsetMastermind: (players, team, player) => {
    if (players.hasIn([team, 'mastermind'])) {
      const mastermind = players.getIn([team, 'mastermind']);
      players = players.deleteIn([team, 'mastermind']);
      players = players.updateIn([team, 'agents'], agents => agents.push(mastermind));
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

export const INITIAL_STATE = Map({
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
