class TaskStore extends Cape.DataStore {
  constructor() {
    super();
    this.tasks = [];
  }

  refresh() {
    $.ajax({
      type: 'GET',
      url: '/api/tasks'
    }).done(data => {
      this.tasks.length = 0;
      data.forEach(task => this.tasks.push(task));
      this.propagate();
    });
  }

  createTask(title) {
    $.ajax({
      type: 'POST',
      url: '/api/tasks',
      data: { task: { title: title } }
    }).done(data => {
      if (data === 'OK') this.refresh();
    });
  }

  updateTask(task, title) {
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id,
      data: { task: { title: title } }
    }).done(data => {
      if (data === 'OK') this.refresh();
    });
  }

  destroyTask(task) {
    $.ajax({
      type: 'DELETE',
      url: '/api/tasks/' + task.id
    }).done(data => {
      if (data === 'OK') this.refresh();
    });
  }

  moveUpTask(task) {
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id + '/move_up'
    }).done(data => {
      if (data === 'OK') this.refresh();
    });
  }

  moveDownTask(task) {
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id + '/move_down'
    }).done(data => {
      if (data === 'OK') this.refresh();
    });
  }

  toggleTask(task) {
    $.ajax({
      type: 'PATCH',
      url: '/api/tasks/' + task.id,
      data: { task: { done: !task.done } }
    }).done(data => {
      if (data === 'OK') this.refresh();
    });
  }
}
