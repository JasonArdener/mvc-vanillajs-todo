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