import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Game from './components/Game';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

const cards = [
  //0
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  //5
  {
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  //10
	{
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  {
		word: 'Word',
		team: 'civilian',
		revealed: true
	},
  //15
	{
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'assassin',
		revealed: true
	},
  {
		word: 'Word',
		team: 'red',
		revealed: false
	},
  {
		word: 'Pear',
		team: 'blue',
		revealed: false
	},
  {
		word: 'Apple',
		team: 'blue',
		revealed: true
	},
  //20
	{
		word: 'Word',
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'assassin',
		revealed: true
	},
  {
		word: 'Washington',
		team: 'red',
		revealed: false
	},
  {
		word: 'Pear',
		team: 'blue',
		revealed: false
	},
  {
		word: 'Apple',
		team: 'blue',
		revealed: true
	}
];

let urlParams = new URLSearchParams(location.search);

ReactDOM.render(
  <Game cards={cards}
    currentUser={urlParams.get('user') || 'adam'}
    sendToServer={(message) => {
      socket.emit('action', message);
    }}
    socket={socket}/>,
  document.getElementById('app')
);
