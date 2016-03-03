// STORE
(function (window) {
    'use strict';
  
  function Store(name) {
    // Create some placeholder data if there is not existing data.
    if (!localStorage[name]) { 
        var data = {
          todos: [
              {
              'body': 'Make this app',
              'checked': 'false'
            },
            {
              'body': 'Have tea', 
              'checked': 'true'
            },
            {
              'body': 'Sleep',
              'checked': 'false'
            }
          ]
        };

      localStorage[name] = JSON.stringify(data);
    }
    
    this.returnStorage = function() {
      return localStorage[name];
    };
    
    this.delete = function(id) {
      var data = JSON.parse(localStorage[name]);
      data.todos.splice(id, 1);
    
      localStorage[name] = JSON.stringify(data);
    };

    this.updateDone = function(id) {
      var data = JSON.parse(localStorage[name]);
      var checked = data.todos[id].checked;

      if(checked === "true") {
        checked = "false";
      } else {
        checked = "true";
      }

      data.todos[id].checked = checked;
      localStorage[name] = JSON.stringify(data);
    };
  }
  
  window.app = window.app || {};
  window.app.Store = Store;
})(window);