var d3 = require('d3');

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