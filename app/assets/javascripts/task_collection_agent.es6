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
}

module.exports = TaskCollectionAgent;
