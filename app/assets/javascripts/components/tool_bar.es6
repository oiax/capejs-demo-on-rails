class ToolBar extends Cape.Partial {
  constructor(parent) {
    super(parent);
    this.pressed = undefined;
  }

  render(m) {
    m.div({ class: 'row text-right'}, m => {
      m.div({ class: 'col-xs-12'}, m => {
        if (this.pressed === undefined) {
          m.onclick(e => { this.pressed = 'logout'; this.refresh(); })
            .btn('Logout', { class: 'btn btn-default btn-flat' });
        }
        else if (this.pressed === 'logout') {
          m.span('Are you sure to logout?').sp();
          m.onclick(e => { this.pressed = undefined; this.refresh(); })
            .btn('Cancel', { class: 'btn btn-default btn-flat' });
          m.onclick(e => this.logout())
            .btn('OK', { class: 'btn btn-primary btn-flat' });
        }
      });
    });
  }

  logout() {
    var sessionAgent = new SessionAgent(this);
    sessionAgent.destroy(data => {
      if (data === 'OK') {
        window.router.vars.signedIn = false;
        window.router.redirectTo('');
      }
      else {
        window.router.show(Errors.UnknownError);
      }
    })
  }
}
