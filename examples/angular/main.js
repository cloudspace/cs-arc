var angular     = require('angular');
var d3          = require('d3');
var csArcModule = require('../../src/arc-angular-1-x.js');

angular
  .module('foo', [
    'csArc'
  ])
  .controller('fooCtrl', ['csArc', function(csArc) {
    var arc = new csArc({
      inner      : 25,
      outer      : 30,
      start      : 0,
      end        : 1,
      transition : 500,
      container  : 'baz-container',
      name       : 'foo'
    });

    arc.render();

    d3
      .select('#baz-container')
      .select('g')
      .attr('transform', 'translate(250,250)');
  }]);