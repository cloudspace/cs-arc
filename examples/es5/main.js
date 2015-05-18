var d3    = require('d3');
var csArc = require('../../src/arc.js');

window.onload = function() {
  
  var foo = new csArc({
    inner      : 50,
    outer      : 100,
    start      : 0,
    end        : 1,
    transition : 500,
    container  : 'foo-container',
    name       : 'foo'
  });
    
  var bar = new csArc({
    inner      : 150,
    outer      : 200,
    start      : 0,
    end        : 1,
    transition : 500,
    container  : 'bar-container',
    name       : 'bar'
  });
  
  var baz = new csArc({
    inner      : 25,
    outer      : 30,
    start      : 0,
    end        : 1,
    transition : 500,
    container  : 'baz-container',
    name       : 'baz'
  });

  foo.render();
  bar.render();
  baz.render();

  d3
    .select('#foo-container')
    .select('g')
    .attr('transform', 'translate(250,250)');
    
  d3
    .select('#bar-container')
    .select('g')
    .attr('transform', 'translate(250,250)');
    
  d3
    .select('#baz-container')
    .select('g')
    .attr('transform', 'translate(250,250)');
};
