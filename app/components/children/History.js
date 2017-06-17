const React = require('react');

const History = React.createClass({

	render: function(){
  return(
   	<div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Hisotry</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            return (
              <p key={i}>{search.query} - {search.date}</p>
            );
          })}
        </div>
    </div>

	)}
});


module.exports = History;