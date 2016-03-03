// var Carousel = require('./components');
var $ = require('jquery');

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



// TEMPLATE
(function (window) {
    'use strict';
  
  function Template() {
    this.itemTemplate
      = '<li data-id="{{id}}">'
      +     '<input type="checkbox" {{checked}} />'
      +     '<label>{{body}}</label>'
      +     '<button class="j-delete">X</button>'
      + '</li>';
  }
   
  Template.prototype.show = function(data) {
    var output = '',
            i = 0;
        
    data = JSON.parse(data).todos;
        
    for(i=0; i<data.length; i++) {
        var template = this.itemTemplate,
            checked = '';
          
      if (data[i].checked === "true") {
        checked = "checked";
      }

      template = template.replace('{{id}}', i);
      template = template.replace('{{body}}', data[i].body);
      template = template.replace('{{checked}}', checked);
      output = output + template;
    }

    return output;
  };
  
  window.app = window.app || {};
  window.app.Template = Template;
})(window);



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



// APP
(function() {
    'use strict';
  
  function Todo(name) {
    this.storage = new app.Store(name);
    this.model = new app.Model(this.storage);
    this.template = new app.Template();
    this.view = new app.View(this.template);
    this.controller = new app.Controller(this.model, this.view);
  }
  
  var todo = new Todo('todo-app');
  
  todo.controller.showEntries();

  window.todo = todo;
})();