class Login extends Cape.Component {
  render(m) {
    var self = this;
    m.form({ onsubmit: e => self.login() }, m => {
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
            onclick: e => self.login()
          });
        });
      });
    });
  }

  login() {
    var self = this;
    $.post('/api/session', this.formData(), data => {
      if (data === 'OK') {
        window.router.redirectTo('');
      }
      else {
        self.refresh();
      }
    });
  }
}
