var Errors = Errors || {}

;((namespace) => {
  class NotFound extends Cape.Component {
    render(m) {
      m.div({ class: 'panel panel-default' }, m => {
        m.div('404 Not Found', { class: 'panel-heading' })
        m.div({ class: 'panel-body' }, m => {
          m.p("The requested page is not available at the momemnt.");
        })
      })
    }
  }
  namespace.NotFound = NotFound;
})(Errors)
