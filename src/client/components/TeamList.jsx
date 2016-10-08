import React from 'react';

import TeamMember from './TeamMember';
import JoinTeam from './JoinTeam';

/**
 * {
 *   mastermind: 'jane'  // Not present if no mastermind
 *   teamMembers: ['bob',]
 * }
 */
export default React.createClass({
  render: function() {
    return <div className="teamList">
             {this.props.mastermind || <JoinTeam text='Be Mastermind'/>}
             <hr/>
             {this.props.teamMembers.map(teamMember =>
               <TeamMember username={teamMember}/>
             )}
             <JoinTeam text='Join Team'/>
           </div>;
  }
});
