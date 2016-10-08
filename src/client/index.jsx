import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';

const cards = [
  //0
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
		team: 'red',
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
		team: 'red',
		revealed: true
	},
  {
		word: 'Word',
		team: 'red',
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
		team: 'red',
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
		team: 'Assassin',
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
		team: 'Assassin',
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
	}
];

ReactDOM.render(
  <Game cards={cards}/>,
  document.getElementById('app')
);
