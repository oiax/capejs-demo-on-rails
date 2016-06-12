var Errors = Errors || {}

;((namespace) => {
  class Forbidden extends Cape.Component {
    render(m) {
      m.div({ class: 'panel panel-default' }, m => {
        m.div('403 Forbidden', { class: 'panel-heading' })
        m.div({ class: 'panel-body' }, m => {
          m.p("You don't have permission to access this page.");
        })
      })
    }
  }
  namespace.Forbidden = Forbidden;
})(Errors)
