import {Game, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'NEW_GAME':
      return Game.newGame(state);
    case 'SET_CARDS':
      return Game.setCards(state, action.cards);
    case 'JOIN_TEAM':
      return state.update('players',
        players => Game.joinTeam(players, action.team, action.player)
      );
    case 'SET_MASTERMIND':
      return state.update('players',
        players => Game.setMastermind(players, action.team, action.player)
      );
    case 'UNSET_MASTERMIND':
      return state.update('players',
        players => Game.unsetMastermind(players, action.team, action.player)
      );
    case 'SET_WINNER':
      return Game.setWinner(state, action.team);
    case 'REVEAL_CARD':
      return Game.revealCard(state, action.index);
    case 'NEXT_TURN':
      return state.update('turn',
        turn => Game.nextTurn(turn)
      );
    case 'SET_PROMPT':
      return state.update('turn',
        turn => Game.setPrompt(turn, action.word, action.limit)
      );
  }

  return state;
}
