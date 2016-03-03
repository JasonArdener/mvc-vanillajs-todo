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
