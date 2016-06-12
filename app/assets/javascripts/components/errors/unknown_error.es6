var Errors = Errors || {}

;((namespace) => {
  class UnknownError extends Cape.Component {
    render(m) {
      m.div({ class: 'panel panel-default' }, m => {
        m.div('Error', { class: 'panel-heading' })
        m.div({ class: 'panel-body' }, m => {
          m.p("Service is not available due to unknown reason.");
        })
      })
    }
  }
  namespace.UnknownError = UnknownError;
})(Errors)
