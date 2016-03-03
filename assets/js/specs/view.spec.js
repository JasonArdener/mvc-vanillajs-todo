var $ = require('jquery');

describe('View', function() {
  it('shows the correct number of todo items', function() {
    expect($('.c-list li').length).toBe(3);
  });

  it('shows the correct label content', function() {
    expect($('.c-list li').first().find('label').text()).toBe('Make this app');
  });
});