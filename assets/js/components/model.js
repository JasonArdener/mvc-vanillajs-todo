// MODEL
(function (window) {
    'use strict';
  
  function Model(storage) {
    self.storage = storage;
  }
  
  Model.prototype.read = function() {
    return self.storage.returnStorage();
  };
  
  Model.prototype.delete = function(id) {
    self.storage.delete(id);
  };

  Model.prototype.updateDone = function(id) {
    self.storage.updateDone(id);
  };
  
  window.app = window.app || {};
  window.app.Model = Model;
})(window);