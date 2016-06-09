$(document).ready(() => {
  Cape.defaultAgentAdapter = 'rails'

  var router = new Cape.Router()
  router.draw(m => {
    m.root('todo_list')
    m.page('login', 'login')
  })

  // router.beforeNavigation(hash => {
  //   return new Promise((resolve, reject) => {
  //     $.ajax({
  //       type: 'GET',
  //       url: '/api/session'
  //     }).done(data => {
  //       if (data === 'OK') {
  //         resolve(hash)
  //       }
  //       else {
  //         resolve('login')
  //       }
  //     }).error(() => {
  //       reject(new Error('ERROR'))
  //     })
  //   })
  // })

  router.errorHandler(function(err) {
    router.show(NetworkError);
  });

  router.mount('todo-list')
  router.start()
})
