var SessionAgent = require('../agents/session_agent.es6');

class Login extends Cape.Component {
  init() {
    this.agent = new SessionAgent(this, { formName: 'user', paramName: 'user' });
    this.refresh();
  }

  render(m) {
    m.formFor('user', { onsubmit: e => this.login() }, m => {
      m.fieldset({ class: 'form-group'}, m => {
        m.labelFor('name', 'User name').sp().textField('name');
      });
      m.fieldset({ class: 'form-group'}, m => {
        m.labelFor('password', 'Password').sp().passwordField('password');
      });
      m.div({ class: 'row'}, m => {
        m.div({ class: 'col-xs-12'}, m => {
          m.btn('Login', {
            class: 'btn btn-primary btn-flat',
            onclick: e => this.login()
          });
          m.btn('Cancel', {
            class: 'btn btn-default btn-flat',
            onclick: e => window.router.redirectTo('')
          });
        });
      });
    });
  }

  login() {
    this.agent.create(data => {
      if (data === 'OK') {
        window.router.redirectTo('todo_list');
      }
      else {
        this.refresh();
      }
    })
  }
}

module.exports = Login;
