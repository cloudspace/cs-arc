(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global d3 */

var Arc = function(options) {
  this.inner = options.inner;
  this.outer = options.outer;
  this.start = options.start;
  this.end = options.end;
  this.transition = options.transition;
  this.name = options.name;
  this.container = options.container;
};

/*
 * http://tauday.com/tau-manifesto
 * https://www.youtube.com/watch?v=jG7vhMMXagQ
 */
 
Arc.arcLength = function(percent) {
  return percent * 2 * Math.PI;
};

Arc.prototype.svg = function() {
  return d3.select(this.container).select('#' + this.name);
};

Arc.prototype.update = function(percent) {
  this
    .svg()
    .transition()
    .duration(this.transition)
    .ease('cubic')
    .call(this.tween.bind(this), Arc.arcLength(percent));
};

/*
  Call a tween on graph data
  Return a function that sets a new end angle in relation to
  percent of the transition completed. Then return the calculated
  intermediate arc.
*/

Arc.prototype.tween = function(transition, newAngle) {
  var self = this;
  transition.attrTween('d', function(d) {
    return function(t) {
      d.endAngle = d3.interpolate(d.endAngle, newAngle)(t);
      return self.obj(d);
    };
  });
};

Arc.prototype.render = function() {
  this.obj = d3
             .svg
             .arc()
             .innerRadius(this.inner)
             .outerRadius(this.outer)
             .startAngle(Arc.arcLength(this.start));

  d3
    .select(this.container)
    .select('g')
    .append('path')
    .attr('id', this.name)
    .datum({endAngle: Arc.arcLength(this.end)})
    .attr('d', this.obj);
};

module.exports = Arc;

},{}],2:[function(require,module,exports){
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
      React.createElement("div", {id: this.state.arc.container}, 
        React.createElement("svg", {id: this.state.arc.name})
      )
    );
  }
});

module.exports = ReactConnector;

},{"../arc.js":1}]},{},[2]);
