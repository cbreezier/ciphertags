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
 *   joinTeam: function(team)
 *   setMastermind: function(team)
 * }
 */
export default React.createClass({
  canJoinTeam: function() {
    return this.props.teamMembers.indexOf(this.props.currentUser) === -1;
  },
  render: function() {
    return <div className="teamList">
             {
               this.props.mastermind ||
               <JoinTeam text='Be Mastermind'
                         callback={this.props.setMastermind.bind(undefined, this.props.team)}/>
             }
             <hr/>
             {
               this.props.teamMembers.map(teamMember =>
                 <TeamMember username={teamMember}/>
               )
             }
             {
               this.canJoinTeam() ?
               <JoinTeam text='Join Team'
                         callback={this.props.joinTeam.bind(undefined, this.props.team)}/>
               : ''
             }
           </div>;
  }
});
