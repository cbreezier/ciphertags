import React from 'react';

/**
 * {
 *   text: 'Join Team'
 */
export default React.createClass({
  render: function() {
    return <div className="joinTeam">
             {this.props.text}
           </div>;
  }
});
