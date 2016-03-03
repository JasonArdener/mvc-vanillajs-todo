var $ = require('jquery');

// CONTROLLER
(function (window) {
    'use strict';
  
  function Controller(model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    $('body').on('click', '.j-delete', function() {
      const thisId = $(this).parent().data('id');
      self.removeEntry(thisId);
    });

    $('body').on('click', 'input[type="checkbox"]', function() {
      const thisId = $(this).parent().data('id');
      self.updateDone(thisId);
    });
  }
  
  Controller.prototype.showEntries = function() {
    var self = this;
    self.view.render(self.model.read());
  };
  
  Controller.prototype.removeEntry = function(id) {
    var self = this;
    self.model.delete(id);
    self.showEntries();
  };

  Controller.prototype.updateDone = function(id) {
    var self = this;
    self.model.updateDone(id);
    self.showEntries();
  };
  
  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);