class TodoList extends Cape.Component {
  init() {
    this.ds = new ItemStore();
    this.ds.attach(this);
    this.items = this.ds.items;
    this.editingItem = null;
    this.ds.refresh();
  }

  render(m) {
    m.ul(m => {
      this.items.forEach((item, index) => {
        m.li(m => this.renderItem(m, item, index));
      });
    });
    this.renderUpdateForm(m);
    this.renderCreateForm(m);
  }

  renderItem(m, item, index) {
    m.label({ class: { completed: item.done }}, m => {
      m.attr({ type: 'checkbox', checked: item.done });
      m.input({ onclick: e => this.ds.toggleItem(item) }).sp();
      m.class({ modifying: item.modifying });
      m.span(item.name)
    }).sp();
    m.span('UPDATE', { class: 'button', onclick: e => this.editItem(item) }).sp();
    m.span('DELETE', { class: 'button', onclick: e => this.ds.deleteItem(item) }).sp();

    if (index === 0) m.class('disabled');
    else m.attr({ onclick: e => this.ds.moveUpItem(item) })
    m.span({ class: 'button' }, m => m.fa('arrow-circle-up')).sp()

    if (index === this.items.length - 1) m.class('disabled');
    else m.attr({ onclick: e => this.ds.moveDownItem(item) })
    m.span({ class: 'button' }, m => m.fa('arrow-circle-down'))
  }

  renderCreateForm(m) {
    m.formFor('new', { visible: !this.editingItem }, m => {
      m.textField('name', { onkeyup: e => this.refresh() }).sp();
      m.attr({ disabled: this.val('new.name').trim().length === 0 });
      m.attr({ onclick: e => this.createItem() })
      m.button(`Add item #${ this.items.length + 1}`);
    });
  }

  renderUpdateForm(m) {
    m.formFor('edit', { visible: this.editingItem }, m => {
      m.textField('name', { onkeyup: e => this.refresh() }).sp();
      m.attr({ disabled: this.val('edit.name').trim().length === 0 });
      m.button('Update', { onclick: e => this.updateItem() }).sp();
      m.button('Cancel', { onclick: e => this.reset() });
    });
  }

  createItem() {
    this.ds.createItem(this.val('new.name', ''))
  }

  editItem(item) {
    if (this.editingItem === item) {
      item.modifying = false;
      this.reset();
    }
    else {
      if (this.editingItem) this.editingItem.modifying = false;
      item.modifying = true;
      this.reset();
      this.editingItem = item;
      this.val('edit.name', item.name);
      this.refresh();
    }
  }

  updateItem() {
    var item = this.editingItem;
    this.editingItem = null;
    this.ds.updateItem(item, this.val('edit.name', ''));
  }

  reset() {
    if (this.editingItem) this.editingItem.modifying = false;
    this.editingItem = null;
    this.val('edit.name', '');
    this.val('new.name', '');
    this.refresh();
  }
}
