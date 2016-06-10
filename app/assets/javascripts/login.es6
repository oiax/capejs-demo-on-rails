class Login extends Cape.Component {
  render(m) {
    m.form({ onsubmit: e => this.login() }, m => {
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
    $.post('/api/session', this.formData(), data => {
      if (data === 'OK') {
        window.router.redirectTo('todo_list');
      }
      else {
        this.refresh();
      }
    });
  }
}
