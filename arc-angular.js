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
  return d3.select('#' + this.container).select('#' + this.name);
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
    .select('#' + this.container)
    .select('g')
    .append('path')
    .attr('id', this.name)
    .datum({endAngle: Arc.arcLength(this.end)})
    .attr('d', this.obj);
};

module.exports = Arc;
},{}],2:[function(require,module,exports){
/* global angular */

var Arc = require('../arc.js');

var AngularConnector = angular
  .module('csArc', [])
  .directive('csArc', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      scope: {
        inner:      '&',
        outer:      '&',
        start:      '&',
        end:        '&',
        transition: '&',
        container:  '&',
        name:       '&',
        width:      '&',
      },
      bindToController: true,
      controllerAs: 'csArc',
      controller: [function() {
        this.translate = 'translate(' + (this.width()/2) + ',' + (this.width()/2) + ')';
        
        this.initArc = function(args) {
          this.arc = new Arc(args);
        };
       
        this.renderArc = function() {
          this.arc.render();  
        };
       
        this.updateArc = function(percent) {
          this.arc.update(percent);
        };
      }],
      link: function(scope, element, attr, ctrl) {
        $timeout(function() {
          ctrl.initArc({
            inner: ctrl.inner(),
            outer: ctrl.outer(),
            start: ctrl.start(),
            end: ctrl.end(),
            transition: ctrl.transition(),
            container: ctrl.container(),
            name: ctrl.name()  
          });
          
          d3
            .select('#' + ctrl.container())
            .attr('width', ctrl.width())
            .attr('height', ctrl.width())
            .select('g')
            .attr('transform',  ctrl.translate);

          ctrl.renderArc();
        });
      },
      template: '<svg id="{{ csArc.container() }}"><g></g></svg>'
    };
  }]);
},{"../arc.js":1}]},{},[2]);
