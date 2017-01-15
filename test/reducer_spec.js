import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {Game} from '../src/core';
import reducer from '../src/reducer';

describe('reducer', () => {
  function makeCard(word, team) {
    return fromJS({
      word: word,
      team: team,
      revealed: false
    });
  }

  it('has an initial state', () => {
    const cards = List.of(
      makeCard('fish', Game.TEAM_RED),
      makeCard('bottle', Game.TEAM_BLUE),
      makeCard('bin', Game.ASSASSIN)
    );

    const action = {type: 'SET_CARDS', cards: cards};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(Map({
      players: Map({
        red: Map({
          agents: List()
        }),
        blue: Map({
          agents: List()
        })
      }),
      cards: cards,
      turn: Map({
        turnNumber: 0,
        team: Game.TEAM_RED
      }),
      chat: List()
    }));
  });

  it('handles SET_CARDS', () => {
    const cards = List.of(
      makeCard('fish', Game.TEAM_RED),
      makeCard('bottle', Game.TEAM_BLUE),
      makeCard('bin', Game.ASSASSIN)
    );

    const initialState = Map();
    const action = {type: 'SET_CARDS', cards: cards};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(Map({
      cards: cards
    }));
  });

  it('handles SET_MASTERMIND', () => {
    const action = {type: 'SET_MASTERMIND', team: 'red', player: 'adam'};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(Map({
      players: Map({
        red: Map({
          agents: List(),
          mastermind: 'adam'
        }),
        blue: Map({
          agents: List()
        })
      }),
      turn: Map({
        turnNumber: 0,
        team: Game.TEAM_RED
      }),
      chat: List()
    }));
  });
});
