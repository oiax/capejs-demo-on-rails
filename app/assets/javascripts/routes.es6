$(document).ready(() => {
  Cape.defaultAgentAdapter = 'rails'

  window.router = new Cape.Router()
  window.router.draw(m => {
    m.root('welcome')
    m.page('login', 'login')
    m.page('todo_list', 'todo_list')
  })

  window.router.beforeNavigation(hash => {
    return new Promise((resolve, reject) => {
      if (hash === '') {
        resolve(hash);
      }
      else {
        $.ajax({
          type: 'GET',
          url: '/api/session'
        }).done(data => {
          if (data === 'OK') {
            resolve(hash)
          }
          else {
            resolve('login')
          }
        }).error(() => {
          reject(new Error('ERROR'))
        })
      }
    })
  })

  window.router.errorHandler(function(err) {
    router.show(NetworkError);
  });

  window.router.mount('todo-list')
  window.router.start()
})
