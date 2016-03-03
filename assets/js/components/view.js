// VIEW
(function (window) {
    'use strict';
  
  function View(template) {
    var self = this;
    self.template = template;
  }
  
  View.prototype.render = function(data) {
    var self = this;
  
   document.getElementById('test').innerHTML = self.template.show(data);
  };
   
  window.app = window.app || {};
  window.app.View = View;
})(window);