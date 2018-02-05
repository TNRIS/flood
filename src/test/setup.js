var jsdom = require('jsdom');
const { JSDOM } = jsdom;

// setup the simplest document possible
var doc =  new JSDOM('<!doctype html><html><body><div id="reactApp"></div></body></html>', {
  url: 'https://app-test',
});

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc.window.document;
global.window = doc.window;
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }

    if (key in global) {
      continue;
    }

    global[key] = window[key];
  }
}

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(doc.window);
