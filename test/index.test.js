const { expect } = require('chai');
const plugin = require('../lib');

describe('feathers-bee', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../lib')).to.equal('function');
  });

  it('basic functionality', () => {
    expect(typeof plugin).to.equal('function', 'It worked');
  });
});
