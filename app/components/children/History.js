const React = require('react');

const History = React.createClass({

	render: function(){
  return(
   	<div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Hisotry</h3>
        </div>
        <div className="panel-body text-center">
        <p>{this.props.last5}</p>
        </div>
    </div>

	)}
});


module.exports = History;