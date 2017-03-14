import { existsSync, openSync, closeSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { init, disableSpecs } from 'jasmine-fail-fast';

/**
 * protractor-fail-fast
 *
 * For the lack of a better (known) option, using a file to communicate between test runners.
 * If the file exists, it means a test has failed in one (or more) of the runners. If a runner
 * detects that this file exists, it will exit using `jasmine-fail-fast`.
 *
 */
const TOUCH_ON_FAIL = resolve(process.cwd(), './.protractor-failed');

export default {
  // Plugin API
  init: function() {
    this.clean(); // Clean up the "fail file" before starting, in case it exists.
    return init();
  },

  clean: function() {
    unsetFailed();
  },

  // Protractor hooks
  onPrepare: function() {
    this.init();
  },

  postTest: function(passed) {
    if (!passed) {
      setFailed();
    }

    if (hasFailed()) {
      disableSpecs();
    }
  },

  postResults: function() {
    this.clean();
  }
};

function hasFailed() {
  return existsSync(TOUCH_ON_FAIL);
}

function setFailed() {
  closeSync(openSync(TOUCH_ON_FAIL, 'w'));
}

function unsetFailed() {
  if (hasFailed()) {
    unlinkSync(TOUCH_ON_FAIL);
  }
}
