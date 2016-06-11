var TaskCollectionAgent = require('./task_collection_agent.es6');

class TodoList extends Cape.Component {
  init() {
    this.agent = new TaskCollectionAgent(this);
    this.editingTask = null;
    this.agent.refresh();
  }

  render(m) {
    this.renderLogoutModal(m);
    m.div({ class: 'row text-right'}, m => {
      m.div({ class: 'col-xs-12'}, m => {
        m.data({ toggle: 'modal', target: '#logoutModal'})
        m.btn('Logout', { class: 'btn btn-default btn-flat' });
      });
    });
    m.ul(m => {
      this.agent.objects.forEach((task, index) => {
        m.li(m => this.renderTask(m, task, index));
      });
    });
    if (this.editingTask) this.renderUpdateForm(m);
    else this.renderCreateForm(m);
  }

  renderLogoutModal(m) {
    m.div({ class: 'modal fade', id: 'logoutModal' }, m => {
      m.div({ class: 'modal-dialog'}, m => {
        m.div({ class: 'modal-content' }, m => {
          m.div({ class: 'modal-body'}, m => {
            m.p('Are you sure to logout?');

            m.data({ dismiss: 'modal' })
              .btn('Cancel', { class: 'btn btn-default'});

            m.data({ dismiss: 'modal' })
              .onclick(e => this.logout())
              .btn('OK', { class: 'btn btn-primary'});
          })
        })
      })
    })
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

  logout() {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      success: data => {
        if (data === 'OK') {
          window.router.redirectTo('');
        }
        else {
          self.refresh();
        }
      }
    });
  }
}

module.exports = TodoList;
