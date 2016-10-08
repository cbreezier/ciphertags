import React from 'react';

/**
 * {
 *   text: 'Join Team'
 *   callback: function
 * }
 */
export default React.createClass({
  render: function() {
    return <div className="joinTeam" onClick={this.props.callback}>
             {'+ ' + this.props.text}
           </div>;
  }
});
