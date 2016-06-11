//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap/dist/js/bootstrap
//= require lodash/lodash
//= require es6-promise/dist/es6-promise
//= require fetch/lib/fetch
//= require capejs/dist/cape
//= require_tree .

Cape.defaultAgentAdapter = 'rails';

window.router = require('./routes.es6');
var rc = router.rootContainer;
rc.Welcome = require('./components/welcome.es6');
rc.Login = require('./components/login.es6');
rc.TodoList = require('./components/todo_list.es6');

var NetworkError = require('./components/network_error.es6');

router.beforeNavigation(hash => {
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

router.errorHandler(function(err) {
  router.show(NetworkError);
});

$(document).ready(function() {
  router.mount('todo-list');
  router.start();
})
