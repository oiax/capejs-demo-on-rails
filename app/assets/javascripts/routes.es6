var router = new Cape.Router();

router.draw(m => {
  m.root('welcome')
  m.page('login')
  m.page('todo_list')
})

module.exports = router;
