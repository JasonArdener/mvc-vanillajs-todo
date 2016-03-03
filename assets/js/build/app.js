/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var store = __webpack_require__(1);
	var model = __webpack_require__(2);
	var template = __webpack_require__(3);
	var view = __webpack_require__(4);
	var controller = __webpack_require__(5);

	// APP
	(function () {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	// STORE
	(function (window) {
	  'use strict';

	  function Store(name) {
	    // Create some placeholder data if there is not existing data.
	    if (!localStorage[name]) {
	      var data = {
	        todos: [{
	          'body': 'Make this app',
	          'checked': 'false'
	        }, {
	          'body': 'Have tea',
	          'checked': 'true'
	        }, {
	          'body': 'Sleep',
	          'checked': 'false'
	        }]
	      };

	      localStorage[name] = JSON.stringify(data);
	    }

	    this.returnStorage = function () {
	      return localStorage[name];
	    };

	    this.delete = function (id) {
	      var data = JSON.parse(localStorage[name]);
	      data.todos.splice(id, 1);

	      localStorage[name] = JSON.stringify(data);
	    };

	    this.updateDone = function (id) {
	      var data = JSON.parse(localStorage[name]);
	      var checked = data.todos[id].checked;

	      if (checked === "true") {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// MODEL
	(function (window) {
	  'use strict';

	  function Model(storage) {
	    self.storage = storage;
	  }

	  Model.prototype.read = function () {
	    return self.storage.returnStorage();
	  };

	  Model.prototype.delete = function (id) {
	    self.storage.delete(id);
	  };

	  Model.prototype.updateDone = function (id) {
	    self.storage.updateDone(id);
	  };

	  window.app = window.app || {};
	  window.app.Model = Model;
	})(window);

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	// TEMPLATE
	(function (window) {
	    'use strict';

	    function Template() {
	        this.itemTemplate = '<li data-id="{{id}}">' + '<input type="checkbox" {{checked}} />' + '<label>{{body}}</label>' + '<button class="j-delete">X</button>' + '</li>';
	    }

	    Template.prototype.show = function (data) {
	        var output = '',
	            i = 0;

	        data = JSON.parse(data).todos;

	        for (i = 0; i < data.length; i++) {
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	// VIEW
	(function (window) {
	  'use strict';

	  function View(template) {
	    var self = this;
	    self.template = template;
	  }

	  View.prototype.render = function (data) {
	    var self = this;

	    document.getElementById('test').innerHTML = self.template.show(data);
	  };

	  window.app = window.app || {};
	  window.app.View = View;
	})(window);

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	// CONTROLLER
	(function (window) {
	  'use strict';

	  function Controller(model, view) {
	    var self = this;
	    self.model = model;
	    self.view = view;
	  }

	  Controller.prototype.showEntries = function () {
	    var self = this;
	    self.view.render(self.model.read());
	    self.setupButtons();
	  };

	  Controller.prototype.removeEntry = function (id) {
	    var self = this;
	    self.model.delete(id);
	    self.showEntries();
	  };

	  Controller.prototype.updateDone = function (id) {
	    var self = this;
	    self.model.updateDone(id);
	    self.showEntries();
	  };

	  Controller.prototype.setupButtons = function () {
	    var self = this;
	    var deleteButtons = document.getElementsByClassName("j-delete");
	    var checkboxes = document.getElementsByTagName("input");
	    var currentEl = null;
	    var i, j;

	    this.deleteHandler = function (e) {
	      var thisId = e.srcElement.parentNode.dataset.id;
	      self.removeEntry(thisId);
	    };

	    this.checkHandler = function (e) {
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

/***/ }
/******/ ]);