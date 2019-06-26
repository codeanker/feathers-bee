const Queue = require('bee-queue');

class Service {
  constructor (options) {
    options = options || {};
    this.paginate = options.paginate;
    this.service = options.service;
    this.events = ['ready', 'error', 'succeeded', 'retrying', 'failed', 'stalled'];
    this.queue = new Queue(options.name, options.queue);
    this.queue.process((job, done) => this._jobProcess(job, done));
  }

  setup () {
    this.queue.on('ready', (result) => this.emit('ready', result));
    this.queue.on('error', (error) => this.emit('error', error));
    this.queue.on('succeeded', (job, result) => this.emit('succeeded', { job: _parseJob(job), result }));
    this.queue.on('retrying', (job, error) => this.emit('retrying', { job: _parseJob(job), error }));
    this.queue.on('failed', (job, error) => this.emit('failed', { job: _parseJob(job), error }));
    this.queue.on('stalled', (jobId) => this.emit('stalled', { jobId }));
  }

  _jobProcess (job, done) {
    const {data, params} = job.data
    return this.service.create(data, {...params, $jobId: job.id})
      .then(res => done(null, res))
      .catch(err => done(err));
  }

  _parseJob (job) {
    return {
      options: job.options,
      id: job.id,
      data: job.data.data,
      status: job.status
    };
  }

  find (params) {
    let limit = params.query.$limit || this.paginate.default;
    limit = (limit > this.paginate.max) ? this.paginate.max : limit;

    let start = params.query.$skip || 0;
    let end = start + limit;
    let size = limit;
    return this.queue.getJobs(params.query.type || 'waiting', { start, end, size })
      .then(res => res.map((val) => this._parseJob(val)))
      .then(data => ({
        data,
        limit,
        skip: start
      }));
  }

  get (id, params) {
    return new Promise((resolve, reject) => {
      this.queue.getJob(id, (err, job) => {
        if (err) return reject(err);
        resolve(this._parseJob(job));
      });
    });
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    return this.queue.createJob({data, params}).save()
      .then(job => this._parseJob(job));
  }
}

function init (options) {
  return new Service(options);
}

init.Service = Service;
module.exports = init;
