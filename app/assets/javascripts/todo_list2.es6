class TodoList2 extends Cape.Component {
  init() {
    this.agent = TaskCollectionAgent
      .create('tasks', { pathPrefix: '/api/v2/' })
    this.agent.attach(this)
    this.editingTask = null;
    this.agent.refresh()
  }

  render(m) {
    m.ul(m => {
      this.agent.objects.forEach((task, index) => {
        m.li(m => this.renderTask(m, task, index));
      });
    });
    if (this.editingTask) this.renderUpdateForm(m);
    else this.renderCreateForm(m);
  }

  renderTask(m, task, index) {
    m.class({ completed: task.done });
    m.label(m => {
      m.onclick(e => this.agent.toggleTask(task));
      m.input({ type: 'checkbox', checked: task.done }).sp();
      m.class({ modifying: task.modifying });
      m.span(task.title);
    });
    m.onclick(e => this.editTask(task));
    m.span('Edit', { class: 'button' });
    m.onclick(e => {
      if (confirm('Are you sure you want to delete this task?'))
        this.agent.destroy(task.id);
    });
    m.span('Delete', { class: 'button' });

    if (index === 0) m.class('disabled');
    else m.onclick(e => this.agent.patch('move_up', task.id));
    m.span({ class: 'button' }, m => m.fa('arrow-circle-up')).sp();

    if (index === this.agent.objects.length - 1) m.class('disabled');
    else m.attr({ onclick: e => this.agent.patch('move_down', task.id) });
    m.span({ class: 'button' }, m => m.fa('arrow-circle-down'));
  }

  renderCreateForm(m) {
    m.formFor('new_task', m => {
      m.onkeyup(e => this.refresh());
      m.textField('title').sp();
      m.attr({ disabled: this.val('new_task.title').trim() === '' });
      m.onclick(e =>
        this.agent.createTask(this.val('new_task.title', '')));
      m.btn(`Add task #${ this.agent.objects.length + 1 }`);
    });
  }

  renderUpdateForm(m) {
    m.formFor('task', m => {
      m.onkeyup(e => this.refresh());
      m.textField('title').sp();
      m.attr({ disabled: this.val('task.title').trim() === '' });
      m.btn('Update', { onclick: e => this.updateTask() });
      m.btn('Cancel', { onclick: e => this.reset() });
    });
  }

  editTask(task) {
    if (this.editingTask === task) {
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

  reset() {
    if (this.editingTask) this.editingTask.modifying = false;
    this.editingTask = null;
    this.val('task.title', '');
    this.refresh();
  }

  updateTask() {
    var task = this.editingTask;
    task.modifying = false;
    this.editingTask = null;
    this.agent.updateTask(task, this.val('task.title', ''));
  }
}
