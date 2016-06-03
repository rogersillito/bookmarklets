javascript:(function() {
  /* outputs visible task details to console in Kanbanflow when a task description is clicked */
  var log = function(msg) { console.log(msg); };
  var outputIt = function(e) {
    var clicked = $(e.target);
    if (!clicked.hasClass('task')) return;
    var msg = "";
    var append = function(txt) { msg += (txt ? txt : "") + "\n"; };
    var textNoChildren = function($el) { return $el.clone().children().remove().end().text(); };
    
    /* log(e.target); */
    var name = textNoChildren(clicked);
    var $description = clicked.children('.task-description');
    var $subtasks = clicked.find('.subTasks label span');
    
    append(name);
    append(name.replace(/./g,"-"));
    if ($description.length) {
      append();
      $description.each(function(i, el) { append($(el).html().replace(/<br>/g,"\n")); });
    }
    if ($subtasks.length) {
      append();
      append('sub-tasks\n---------');
      $subtasks.each(function(i, el) { append($(el).text()); });
    }
    log(msg);
  };
  $('.task').click(outputIt);
  log('Ready to dump KanbanFlow Tasks...');
})()
