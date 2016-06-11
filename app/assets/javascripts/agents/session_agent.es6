class SessionAgent extends Cape.ResourceAgent {
  constructor(client, options) {
    super(client, options);
    this.resourceName = 'session';
    this.basePath = '/api/';
    this.singular = true;
  }
}

module.exports = SessionAgent;
