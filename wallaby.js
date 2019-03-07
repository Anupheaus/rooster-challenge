module.exports = function () {
  return {
    name: 'Rooster Challenge',
    files: [
      '!src/**/*.tests.ts?(x)',
      { pattern: 'app.config.json', load: false },
      { pattern: 'package.json', load: false },
      { pattern: 'src/**/*.ts?(x)', load: false },
    ],
    tests: [
      { pattern: 'src/**/*.tests.ts?(x)' },
    ],
    testFramework: 'mocha',
    env: {
      type: 'node',
    },
    workers: {
      initial: 6,
      regular: 3,
    },
    setup: function () {
      require('anux-common');
      const chai = require('chai');
      const spies = require('chai-spies');
      const fuzzy = require('chai-fuzzy');

      chai.use(spies);
      chai.use(fuzzy);

      global['chai'] = chai;
      global['expect'] = chai.expect;

      const jsdom = require('jsdom');
      const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
      const enzyme = require('enzyme');
      const React = require('react');
      const enzymeAdapter = require('enzyme-adapter-react-16');

      global['React'] = React;
      global['document'] = dom.window.document;
      global['window'] = dom.window;
      global.navigator = {
        userAgent: 'node.js',
      };

      enzyme.configure({ adapter: new enzymeAdapter() });
    },
  };
}