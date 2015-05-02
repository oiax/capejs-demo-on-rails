class TodoList extends Cape.Component {
  init() {
    this.items = [ { name: 'Test', done: false } ];
    this.text = '';
    this.editingItem = null;
    this.refresh();
  }

  render(m) {
    m.ul(m => {
      this.items.forEach(item => {
        m.li(m => this.renderItem(m, item));
      });
    });
    if (this.editingItem) this.renderUpdateForm(m);
    else this.renderCreateForm(m);
  }

  renderItem(m, item) {
    m.label({ class: { completed: item.done }}, m => {
      m.attr({ type: 'checkbox', checked: item.done });
      m.input({ onclick: e => this.toggleItem(item) }).sp();
      m.class({ modifying: this.modifying && item.modifying });
      m.span(item.name)
    }).sp();
    m.span('UPDATE', { class: 'button', onclick: e => this.editItem(item) }).sp();
    m.span('DESTROY', { class: 'button', onclick: e => this.destroyItem(item) });
  }

  renderCreateForm(m) {
    m.formFor('new', { onsubmit: e => this.createItem() }, m => {
      m.textField('name', { onkeyup: e => this.refresh() }).sp();
      m.attr({ disabled: this.val('new.name').length === 0 });
      m.attr({ onclick: e => this.createItem() })
      m.button(`Add item #${ this.items.length + 1}`);
    });
  }

  renderUpdateForm(m) {
    m.formFor('edit', m => {
      m.textField('name', { onkeyup: e => this.refresh() }).sp();
      m.attr({ disabled: this.val('edit.name').length === 0 });
      m.button('Update', { onclick: e => this.updateItem() }).sp();
      m.button('Cancel', { onclick: e => this.reset() });
    });
  }

  createItem() {
    this.items.push({ name: this.val('new.name'), done: false });
    this.val('new.name', '');
    this.refresh();
  }

  editItem(item) {
    this.editingItem = item;
    this.val('edit.name', item.name);
    this.refresh();
  }

  updateItem() {
    this.editingItem.name = this.val('edit.name');
    this.reset();
  }

  reset() {
    this.editingItem = null;
    this.val('edit.name', '');
    this.val('new.name', '');
    this.refresh();
  }
}
