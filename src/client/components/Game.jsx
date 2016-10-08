import React from 'react';

import Cards from './Cards';
import TeamList from './TeamList';

/**
 * {
 *   cards: [
 *     {
 *       word: 'rat',
 *       team: 'red|blue|assassin|civilian',
 *       revealed: true|false
 *     }
 *   ],
 *   joinTeam: function(team),
 *   setMastermind: function(team),
 *   currentUser: 'adam'
 */
export default React.createClass({
  render: function() {
    return <div id='game'>
             <Cards cards={this.props.cards}/>
             <div className='row userSection'>
               <div className='col-md-3'></div>
               <div className='col-md-2'>
                 <TeamList team='red'
                           mastermind='jane'
                           teamMembers={['bob', 'john']}
                           currentUser={this.props.currentUser}
                           joinTeam={this.props.joinTeam}
                           setMastermind={this.props.setMastermind}/>
               </div>
               <div className='col-md-2'></div>
               <div className='col-md-2'>
                 <TeamList team='blue'
                           teamMembers={['adam', 'michelle']}
                           currentUser={this.props.currentUser}
                           joinTeam={this.props.joinTeam}
                           setMastermind={this.props.setMastermind}/>
               </div>
               <div className='col-md-3'></div>
             </div>
           </div>;
  }
});
