var $ = require('jquery');
$('body').append('<ul class="c-list" id="test"></ul>');

var app = require('./app.js');


describe('Store', function() {
  it('returns storage object', function() {
    expect(todo.storage.returnStorage()).toBeDefined();
  });

  it('has 3 todo items', function() {
    expect(JSON.parse(todo.storage.returnStorage()).todos.length).toBe(3);
  });

  it('can delete a todo', function() {
    todo.storage.delete(1);
    expect(JSON.parse(todo.storage.returnStorage()).todos.length).toBe(2);
  });
});


describe("Local storage", function() {
  var todos = null;
  beforeEach(function() {
    todos = JSON.parse(localStorage['todo-app']).todos;
  });
  
  it("have 2 todo items", function() {
    expect(todos.length).toBe(2);
  });

  it("second todo content is Have tea", function() {
    expect(todos[1].body).toBe("Sleep");
  });
});


describe('Template', function() {
  var data = {
    todos: [
      {
        'body': 'Make this app',
        'checked': 'false'
      }
    ]
  };

  it('can sucessfully generate html from template and data', function() {
    var templateOut = todo.template.show(JSON.stringify(data));
    expect(templateOut).not.toBe(null);
    expect(templateOut).toBe('<li data-id="0"><input type="checkbox"  /><label>Make this app</label><button class="j-delete">X</button></li>');
  });
});


describe('View', function() {
  it('shows the correct number of todo items', function() {
    expect($('.c-list li').length).toBe(3);
  });

  it('shows the correct label content', function() {
    expect($('.c-list li').first().find('label').text()).toBe('Make this app');
  });
});