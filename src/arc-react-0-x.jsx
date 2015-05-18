var Arc = require('./arc.js');
var React = require('react');

var ReactConnector = React.createClass({
  displayName: 'CSArc',
  propTypes: {
    inner:      React.PropTypes.number, // inner radius
    outer:      React.PropTypes.number, // outer radius
    start:      React.PropTypes.number, // starting angle
    end:        React.PropTypes.number, // ending angle
    width:      React.PropTypes.number, // width of the svg
    transition: React.PropTypes.number, // time in milliseconds
    container:  React.PropTypes.string, // container id
    name:       React.PropTypes.string  // arc id
  },
  updateArc: function(percent) {
    this.state.arc.update(percent);
  },
  componentDidMount: function() {
    this.state.arc.render();
    
    d3
      .select('#' + this.state.arc.container)
      .attr('width', this.props.width)
      .attr('height', this.props.width)
      .select('g')
      .attr('transform',  'translate(' + (this.props.width/2) + ',' + (this.props.width/2) + ')');
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
      <svg id={this.state.arc.container}>
        <g></g>
      </svg>
    );
  }
});

module.exports = ReactConnector;