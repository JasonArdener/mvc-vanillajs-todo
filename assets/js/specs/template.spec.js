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