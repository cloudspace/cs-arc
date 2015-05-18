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
        name:       '&'
      },
      bindToController: true,
      controllerAs: 'csArc',
      controller: [function() {
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
            inner: ctrl.inner,
            outer: ctrl.outer,
            start: ctrl.start,
            end: ctrl.end,
            transition: ctrl.transition,
            container: ctrl.container,
            name: ctrl.name  
          });
          
          ctrl.renderArc();
        });
      },
      template: '<div id="{{ csArc.container }}"><svg id="{{ csArc.name }}"></svg></div>'
    };
  }]);
  
module.exports = AngularConnector;