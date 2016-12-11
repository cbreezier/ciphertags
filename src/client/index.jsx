import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Game from './components/Game';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

let urlParams = new URLSearchParams(location.search);

function defaultFillerCards() {
  let cards = [];
  for (let i = 0; i < 25; i++) {
    cards.push({
      word: '',
      team: 'civilian',
      revealed: false
    });
  }

  return cards;
}

ReactDOM.render(
  <Game cards={defaultFillerCards()}
    currentUser={urlParams.get('user') || 'adam'}
    sendToServer={(message) => {
      socket.emit('action', message);
    }}
    socket={socket}/>,
  document.getElementById('app')
);
