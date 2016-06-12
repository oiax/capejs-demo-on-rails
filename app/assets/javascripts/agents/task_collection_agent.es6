class TaskCollectionAgent extends Cape.CollectionAgent {
  constructor(options) {
    super(options);
    this.resourceName = 'tasks';
    this.basePath = '/api/';
  }

  createTask(title) {
    this.create({ task: { title: title } });
  }

  updateTask(task, title) {
    this.update(task.id, { task: { title: title } });
  }

  toggleTask(task) {
    this.update(task.id, { done: task.done ? 0 : 1 });
  }

  defaultErrorHandler(ex) {
    if (ex.response.status === 401) {
      window.router.redirectTo('login');
    }
    else if (ex.response.status === 403) {
      window.router.show(Errors.Forbidden);
    }
    else if (ex.response.status === 404) {
      window.router.show(Errors.NotFound);
    }
    else {
      window.router.show(Errors.UnknownError);
    }
  }
}
