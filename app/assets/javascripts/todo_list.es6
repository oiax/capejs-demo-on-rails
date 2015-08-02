class TodoList extends Cape.Component {
  init() {
    this.ds = new TaskStore();
    this.ds.attach(this);
    this.editingTask = null;
    this.ds.refresh();
  }

  render(m) {
    m.ul(m => {
      this.ds.tasks.forEach((task, index) => {
        m.li(m => this.renderTask(m, task, index));
      });
    });
    if (this.editingTask) this.renderUpdateForm(m);
    else this.renderCreateForm(m);
  }

  renderTask(m, task, index) {
    m.label({ class: { completed: task.done }}, m => {
      m.attr({ type: 'checkbox', checked: task.done });
      m.input({ onclick: e => this.ds.toggleTask(task) }).sp();
      m.class({ modifying: task.modifying });
      m.span(task.title);
    });
    m.onclick(e => this.editTask(task));
    m.span('Edit', { class: 'button' });
    m.onclick(e => {
      if (confirm('Are you sure you want to delete this task?'))
        this.ds.destroyTask(task);
    });
    m.span('Delete', { class: 'button' });

    if (index === 0) m.class('disabled');
    else m.onclick(e => this.ds.moveUpTask(task));
    m.span({ class: 'button' }, m => m.fa('arrow-circle-up')).sp();

    if (index === this.ds.tasks.length - 1) m.class('disabled');
    else m.attr({ onclick: e => this.ds.moveDownTask(task) });
    m.span({ class: 'button' }, m => m.fa('arrow-circle-down'));
  }

  renderCreateForm(m) {
    m.formFor('new_task', m => {
      m.onkeyup(e => this.refresh());
      m.textField('title').sp();
      m.attr({ disabled: this.val('new_task.title').trim().length === 0 });
      m.attr({ onclick: e => this.createTask() });
      m.button(`Add task #${ this.ds.tasks.length + 1}`);
    });
  }

  renderUpdateForm(m) {
    m.formFor('task', m => {
      m.onkeyup(e => this.refresh());
      m.textField('title').sp();
      m.attr({ disabled: this.val('task.title').trim().length === 0 });
      m.button('Update', { onclick: e => this.updateTask() });
      m.button('Cancel', { onclick: e => this.reset() });
    });
  }

  createTask() {
    this.ds.createTask(this.val('new_task.title', ''))
  }

  editTask(task) {
    if (this.editingTask === task) {
      task.modifying = false;
      this.reset();
    }
    else {
      if (this.editingTask) this.editingTask.modifying = false;
      task.modifying = true;
      this.reset();
      this.editingTask = task;
      this.val('task.title', task.title);
      this.refresh();
    }
  }

  updateTask() {
    var task = this.editingTask;
    this.editingTask = null;
    this.ds.updateTask(task, this.val('task.title', ''));
  }

  reset() {
    if (this.editingTask) this.editingTask.modifying = false;
    this.editingTask = null;
    this.val('task.title', '');
    this.refresh();
  }
}
