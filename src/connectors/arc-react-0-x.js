/* global React */

var Arc = require('../arc.js');

var ReactConnector = React.createClass({
  displayName: 'CSArc',
  propTypes: {
    inner:      React.PropTypes.number, // inner radius
    outer:      React.PropTypes.number, // outer radius
    start:      React.PropTypes.number, // starting angle
    end:        React.PropTypes.number, //ending angle
    transition: React.PropTypes.number, // time in milliseconds
    container:  React.PtopTypes.string, // container id
    name:       React.PropTypes.string  // arc id
  },
  updateArc: function(percent) {
    this.state.arc.update(percent);
  },
  componentDidMount: function() {
    this.state.arc.render();
  },
  componentDidUpdate: function() {
    this.state.arc.update(this.state.arc.end);
  },
  getInitialState: function() {
    return {
      arc: new Arc({
        inner:      this.props.inner,
        outer:      this.props.outer,
        start:      this.props.start,
        end:        this.props.end,
        transition: this.props.transition,
        container:  this.props.container,
        name:       this.props.name
      })
    };
  },
  render: function() {
    return (
      <div id={this.state.arc.container}>
        <svg id={this.state.arc.name}></svg>
      </div>
    );
  }
});

module.exports = ReactConnector;