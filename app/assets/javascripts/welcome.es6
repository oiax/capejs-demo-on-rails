class Welcome extends Cape.Component {
  render(m) {
    m.div({ class: 'panel panel-default' }, m => {
      m.div({ class: 'panel-body' }, m => {
        m.p('Welcome to TODO LIST app!');
        m.div(m => {
          m.btn('Start', {
            class: 'btn btn-success btn-flat',
            onclick: e => window.router.navigate('todo_list')
          });
        })
      })
    })
  }
}
