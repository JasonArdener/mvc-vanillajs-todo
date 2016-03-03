// CONTROLLER
(function (window) {
    'use strict';
  
  function Controller(model, view) {
    var self = this;
    self.model = model;
    self.view = view;
  }
  
  Controller.prototype.showEntries = function() {
    var self = this;
    self.view.render(self.model.read());
    self.setupButtons();
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

  Controller.prototype.setupButtons = function() {
    var self = this;
    var deleteButtons = document.getElementsByClassName("j-delete");
    var checkboxes = document.getElementsByTagName("input");
    var currentEl = null;
    var i, j;

    this.deleteHandler = function(e) { 
      var thisId = e.srcElement.parentNode.dataset.id;
      self.removeEntry(thisId);
    };

    this.checkHandler = function(e) { 
      var thisId = e.srcElement.parentNode.dataset.id;
      self.updateDone(thisId);
    };

    for (i = 0; i < deleteButtons.length; i++) {
      currentEl = deleteButtons[i]; 
      currentEl.addEventListener('click', this.deleteHandler, false);
    } 
 
    for (j = 0; j < checkboxes.length; j++) {
      currentEl = checkboxes[j]; 
      currentEl.addEventListener('click', this.checkHandler, false);
    }
  };
  
  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);