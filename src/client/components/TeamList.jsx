import React from 'react';

import TeamMember from './TeamMember';
import JoinTeam from './JoinTeam';

/**
 * {
 *   team: 'red',
 *   mastermind: 'jane',  // Not present if no mastermind
 *   teamMembers: ['bob',],
 *   currentUser: 'adam',
 *
 *   sendToServer: function(message)
 * }
 */
export default React.createClass({
  setMastermind: function() {
    this.props.sendToServer({
      type: 'SET_MASTERMIND',
      team: this.props.team,
      player: this.props.currentUser
    });
  },
  joinTeam: function() {
    this.props.sendToServer({
      type: 'JOIN_TEAM',
      team: this.props.team,
      player: this.props.currentUser
    });
  },
  canJoinTeam: function() {
    return this.props.teamMembers.indexOf(this.props.currentUser) === -1;
  },
  render: function() {
    return <div className={`teamList ${this.props.team}`}>
             {
               this.props.mastermind ?
               <TeamMember username={this.props.mastermind}
                           currentUser={this.props.currentUser}/> :
               <JoinTeam text='Mastermind'
                         callback={this.setMastermind}/>
             }
             <hr/>
             {
               this.props.teamMembers.map(teamMember =>
                 <TeamMember key={teamMember}
                             username={teamMember}
                             currentUser={this.props.currentUser}/>
               )
             }
             {
               this.canJoinTeam() ?
               <JoinTeam text='Join Team'
                         callback={this.joinTeam}/>
               : ''
             }
           </div>;
  }
});
