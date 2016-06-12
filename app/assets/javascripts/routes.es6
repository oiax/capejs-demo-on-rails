var router = new Cape.Router();

router.draw(m => {
  m.root('welcome')
  m.page('login')
  m.page('todo_list')
})

$(document).ready(() => {
  router.mount('todo-list');
  router.start();
})
