import React from 'react';

import Cards from './Cards';
import TeamList from './TeamList';

/**
 * state:
 * {
 *   cards: [
 *     {
 *       word: 'rat',
 *       team: 'red|blue|assassin|civilian',
 *       revealed: true|false
 *     }
 *   ],
 *   sendToServer: function(message),
 *   currentUser: 'adam'
 */
export default React.createClass({
  componentDidMount: function() {
    this.props.socket.on('state', (state) => {
      console.log(state);
      this.setState(state);
    });
  },
  getInitialState: function() {
    // TODO fix this up properly
    return {
      players: {
        red: {
          agents: [],
        },
        blue: {
          agents: [],
        }
      },
      cards: this.props.cards,
      currentUser: this.props.currentUser
    };
  },
  render: function() {
    return <div id='game'>
             <div className='cardSection'>
               <Cards cards={this.state.cards}/>
             </div>

             <div className='row userSection'>
               <div className='col-md-3'></div>
               <div className='col-md-2'>
                 <TeamList team='red'
                           mastermind={this.state.players.red.mastermind}
                           teamMembers={this.state.players.red.agents}
                           currentUser={this.state.currentUser}
                           sendToServer={this.props.sendToServer}/>
               </div>
               <div className='col-md-2'></div>
               <div className='col-md-2'>
                 <TeamList team='blue'
                           mastermind={this.state.players.blue.mastermind}
                           teamMembers={this.state.players.blue.agents}
                           currentUser={this.state.currentUser}
                           joinTeam={this.props.joinTeam}
                           sendToServer={this.props.sendToServer}/>
               </div>
               <div className='col-md-3'></div>
             </div>
           </div>;
  }
});
