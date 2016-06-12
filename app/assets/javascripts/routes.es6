window.router = new Cape.Router();

router.draw(m => {
  m.root('welcome')
  m.page('login')
  m.page('todo_list')
})

$(document).ready(() => {
  var agent = new SessionAgent();
  agent.show(data => {
    if (data === 'OK') window.router.vars.signedIn = true;
    window.router.mount('todo-list');
    window.router.start();
  }, ex => {
    var errorPage = new Errors.UnknownError();
    errorPage.mount('todo-list');
  })
})
