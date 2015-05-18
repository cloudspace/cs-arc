var React = require('react');
var d3    = require('d3');
var CSArc = require('../../src/arc-react-0-x.jsx');

window.onload = function() {
  React.render(
  <div>
    <CSArc inner={50}  outer={100} start={0} end={1} transition={500} width={500} container='foo-container' name='foo' />
    <CSArc inner={150} outer={200} start={0} end={1} transition={500} width={500} container='bar-container' name='bar' />
    <CSArc inner={25}  outer={30}  start={0} end={1} transition={500} width={500} container='baz-container' name='baz' />
  </div>, 
  document.getElementById('body')
)
};