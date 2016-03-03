var store = require('./components/store.js'); 
var model = require('./components/model.js');  
var template = require('./components/template.js'); 
var view = require('./components/view.js');
var controller = require('./components/controller.js');

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