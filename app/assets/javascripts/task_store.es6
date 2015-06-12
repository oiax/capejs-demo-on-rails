class TaskStore extends Cape.DataStore {
  constructor() {
    super();
    this.tasks = [];
  }

  refresh() {
    var self = this;
    $.ajax({
      type: 'GET',
      url: '/api/tasks.json'
    }).done(data => {
      self.tasks.length = 0;
      data.forEach(task => self.tasks.push(task));
      self.propagate();
    });
  }

  createTask(name) {
    var self = this;
    $.ajax({
      type: 'POST',
      url: '/api/tasks',
      data: { task: { name: name } }
    }).done(data => {
      if (data === 'OK') self.refresh();
    });
  }

  updateTask(task, name) {
    var self = this;
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id,
      data: { task: { name: name } }
    }).done(data => {
      if (data === 'OK') self.refresh();
    });
  }

  deleteTask(task) {
    var self = this;
    $.ajax({
      type: 'DELETE',
      url: '/api/tasks/' + task.id
    }).done(data => {
      if (data === 'OK') self.refresh();
    });
  }

  moveUpTask(task) {
    var self = this;
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id + '/move_up'
    }).done(data => {
      if (data === 'OK') self.refresh();
    });
  }

  moveDownTask(task) {
    var self = this;
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id + '/move_down'
    }).done(data => {
      if (data === 'OK') self.refresh();
    });
  }

  toggleTask(task) {
    var self = this;
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id,
      data: { task: { done: !task.done } }
    }).done(data => {
      if (data === 'OK') self.refresh();
    });
  }
}
