var router = new Cape.Router();

router.draw(m => {
  m.root('welcome')
  m.page('login')
  m.page('todo_list')
})

router.beforeNavigation(hash => {
  return new Promise(function(resolve, reject) {
    if (hash === '') {
      resolve(hash);
    }
    else {
      var agent = new SessionAgent(router);
      agent.get('', {}, function(data) {
        if (data === 'OK') {
          resolve(hash)
        }
        else {
          resolve('login')
        }
      }, function() {
        reject(new Error('ERROR'))
      })
    }
  })
})

router.errorHandler(function(err) {
  router.show(Errors.UnknownError);
});

$(document).ready(function() {
  router.mount('todo-list');
  router.start();
})
