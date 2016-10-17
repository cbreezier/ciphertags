import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {Game} from '../src/core';

describe('application logic', () => {
  describe('setCards', () => {
    function makeCard(word, team) {
      return fromJS({
        word: word,
        team: team,
        revealed: false
      });
    }

    it('sets the initial words for the game', () => {
      const game = Map();
      const cards = List.of(
        makeCard('fish', Game.TEAM_RED),
        makeCard('bottle', Game.TEAM_BLUE),
        makeCard('bin', Game.ASSASSIN)
      );

      const nextState = Game.setCards(game, cards);
      expect(nextState).to.equal(Map({
        cards: List.of(
          makeCard('fish', Game.TEAM_RED),
          makeCard('bottle', Game.TEAM_BLUE),
          makeCard('bin', Game.ASSASSIN)
        )
      }));
    });
  });

  describe('revealCard', () => {
    function makeCard(word, team, revealed = false) {
      return fromJS({
        word: word,
        team: team,
        revealed: revealed
      });
    }

    it('reveals the team that a card belongs to', () => {
      let game = Map({
        turn: Map({
          turnNumber: 0,
          team: Game.TEAM_RED,
          prompt: Map({
            word: 'test',
            limit: 3
          }),
          guesses: 0
        })
      });

      const cards = List.of(
        makeCard('fish', Game.TEAM_RED),
        makeCard('bottle', Game.TEAM_BLUE),
        makeCard('bin', Game.ASSASSIN),
        makeCard('cup', Game.TEAM_BLUE),
        makeCard('tube', Game.TEAM_BLUE)
      );

      game = Game.setCards(game, cards);
      game = Game.revealCard(game, 1);

      expect(game).to.equal(Map({
        cards: List.of(
          makeCard('fish', Game.TEAM_RED),
          makeCard('bottle', Game.TEAM_BLUE, true),
          makeCard('bin', Game.ASSASSIN),
          makeCard('cup', Game.TEAM_BLUE),
          makeCard('tube', Game.TEAM_BLUE)
        ),
        turn: Map({
          turnNumber: 1,
          team: Game.TEAM_BLUE,
        })
      }));

      game = game.update('turn', turn => Game.setPrompt(turn, 'blue', 1));
      game = Game.revealCard(game, 3);

      expect(game).to.equal(Map({
        cards: List.of(
          makeCard('fish', Game.TEAM_RED),
          makeCard('bottle', Game.TEAM_BLUE, true),
          makeCard('bin', Game.ASSASSIN),
          makeCard('cup', Game.TEAM_BLUE, true),
          makeCard('tube', Game.TEAM_BLUE)
        ),
        turn: Map({
          turnNumber: 1,
          team: Game.TEAM_BLUE,
          prompt: Map({
            word: 'blue',
            limit: 1
          }),
          guesses: 1
        })
      }));

      game = Game.revealCard(game, 4);

      expect(game).to.equal(Map({
        cards: List.of(
          makeCard('fish', Game.TEAM_RED),
          makeCard('bottle', Game.TEAM_BLUE, true),
          makeCard('bin', Game.ASSASSIN),
          makeCard('cup', Game.TEAM_BLUE, true),
          makeCard('tube', Game.TEAM_BLUE, true)
        ),
        turn: Map({
          turnNumber: 2,
          team: Game.TEAM_RED,
        })
      }));
    });
  });

  describe('joinTeam', () => {
    it('joins a player to team red if specified', () => {
      const players = Map();
      const nextState = Game.joinTeam(players, Game.TEAM_RED, 'albert');

      expect(nextState).to.equal(Map({
        red: Map({
          agents: List.of('albert')
        })
      }));
    });

    it('joins a player to team blue if specified', () => {
      const players = Map();
      const nextState = Game.joinTeam(players, Game.TEAM_BLUE, 'bob');

      expect(nextState).to.equal(Map({
        blue: Map({
          agents: List.of('bob')
        })
      }));
    });
  });

  describe('setMastermind', () => {
    it('changes a player from an agent to the mastermind', () => {
      let players = Map();
      players = Game.joinTeam(players, Game.TEAM_RED, 'albert');
      players = Game.setMastermind(players, Game.TEAM_RED, 'albert');

      expect(players).to.equal(Map({
        red: Map({
          agents: List(),
          mastermind: 'albert'
        })
      }));
    });

    it('does not set mastermind if one already exists', () => {
      let players = Map();
      players = Game.joinTeam(players, Game.TEAM_RED, 'albert');
      players = Game.joinTeam(players, Game.TEAM_RED, 'emma');
      players = Game.setMastermind(players, Game.TEAM_RED, 'albert');
      players = Game.setMastermind(players, Game.TEAM_RED, 'emma');

      expect(players).to.equal(Map({
        red: Map({
          agents: List.of('emma'),
          mastermind: 'albert'
        })
      }));
    });

    it('does set mastermind if player is not an agent', () => {
      let players = Map();
      players = Game.joinTeam(players, Game.TEAM_RED, 'albert');
      players = Game.joinTeam(players, Game.TEAM_RED, 'emma');
      players = Game.setMastermind(players, Game.TEAM_RED, 'bob');

      expect(players).to.equal(Map({
        red: Map({
          agents: List.of('albert', 'emma'),
          mastermind: 'bob'
        })
      }));
    });
  });

  describe('unsetMastermind', () => {
    it('remoevs a player from mastermind', () => {
      let players = Map();
      players = Game.joinTeam(players, Game.TEAM_RED, 'albert');
      players = Game.joinTeam(players, Game.TEAM_RED, 'emma');
      players = Game.setMastermind(players, Game.TEAM_RED, 'emma');

      expect(players).to.equal(Map({
        red: Map({
          agents: List.of('albert'),
          mastermind: 'emma'
        })
      }));

      players = Game.unsetMastermind(players, Game.TEAM_RED, 'emma');

      expect(players).to.equal(Map({
        red: Map({
          agents: List.of('albert')
        })
      }));
    });

    it('does nothing if player is not the mastermind', () => {
      let players = Map();
      players = Game.joinTeam(players, Game.TEAM_RED, 'albert');
      players = Game.joinTeam(players, Game.TEAM_RED, 'emma');
      players = Game.unsetMastermind(players, Game.TEAM_RED, 'albert');

      expect(players).to.equal(Map({
        red: Map({
          agents: List.of('albert', 'emma')
        })
      }));
    });
  });
});
