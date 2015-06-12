class TodoList extends Cape.Component {
  init() {
    this.ds = new TaskStore();
    this.ds.attach(this);
    this.tasks = this.ds.tasks;
    this.editingTask = null;
    this.ds.refresh();
  }

  render(m) {
    m.ul(m => {
      this.tasks.forEach((task, index) => {
        m.li(m => this.renderTask(m, task, index));
      });
    });
    this.renderUpdateForm(m);
    this.renderCreateForm(m);
  }

  renderTask(m, task, index) {
    m.label({ class: { completed: task.done }}, m => {
      m.attr({ type: 'checkbox', checked: task.done });
      m.input({ onclick: e => this.ds.toggleTask(task) }).sp();
      m.class({ modifying: task.modifying });
      m.span(task.title)
    }).sp();
    m.span('UPDATE', { class: 'button', onclick: e => this.editTask(task) }).sp();
    m.span('DELETE', { class: 'button', onclick: e => this.ds.deleteTask(task) }).sp();

    if (index === 0) m.class('disabled');
    else m.attr({ onclick: e => this.ds.moveUpTask(task) })
    m.span({ class: 'button' }, m => m.fa('arrow-circle-up')).sp()

    if (index === this.tasks.length - 1) m.class('disabled');
    else m.attr({ onclick: e => this.ds.moveDownTask(task) })
    m.span({ class: 'button' }, m => m.fa('arrow-circle-down'))
  }

  renderCreateForm(m) {
    m.formFor('new', { visible: !this.editingTask }, m => {
      m.textField('title', { onkeyup: e => this.refresh() }).sp();
      m.attr({ disabled: this.val('new.title').trim().length === 0 });
      m.attr({ onclick: e => this.createTask() })
      m.button(`Add task #${ this.tasks.length + 1}`);
    });
  }

  renderUpdateForm(m) {
    m.formFor('edit', { visible: this.editingTask }, m => {
      m.textField('title', { onkeyup: e => this.refresh() }).sp();
      m.attr({ disabled: this.val('edit.title').trim().length === 0 });
      m.button('Update', { onclick: e => this.updateTask() }).sp();
      m.button('Cancel', { onclick: e => this.reset() });
    });
  }

  createTask() {
    this.ds.createTask(this.val('new.title', ''))
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
      this.val('edit.title', task.title);
      this.refresh();
    }
  }

  updateTask() {
    var task = this.editingTask;
    this.editingTask = null;
    this.ds.updateTask(task, this.val('edit.title', ''));
  }

  reset() {
    if (this.editingTask) this.editingTask.modifying = false;
    this.editingTask = null;
    this.val('edit.title', '');
    this.val('new.title', '');
    this.refresh();
  }
}
