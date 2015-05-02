class ItemStore extends Cape.DataStore {
  constructor() {
    super();
    this.items = [];
  }
  refresh() {
    var self = this
    $.ajax({
      type: 'GET',
      url: '/api/items.json'
    }).done(function(data) {
      self.items.length = 0
      data.forEach(item => self.items.push(item))
      self.propagate()
    })
  }
  createItem(name) {
    var self = this
    $.ajax({
      type: 'POST',
      url: '/api/items',
      data: { item: { name: name } }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  }
  updateItem(item, name) {
    var self = this
    $.ajax({
      type: 'PATCH',
      url: '/api/items/' + item.id,
      data: { item: { name: name } }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  }
  deleteItem(item) {
    var self = this
    $.ajax({
      type: 'DELETE',
      url: '/api/items/' + item.id
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  }
  toggleItem(item) {
    var self = this
    $.ajax({
      type: 'PATCH',
      url: '/api/items/' + item.id,
      data: { item: { done: !item.done } }
    }).done(function(data) {
      if (data === 'OK')
        self.refresh()
    })
  }
}
