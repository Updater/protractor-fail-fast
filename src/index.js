import fs from 'fs';
import {resolve} from 'path';
import {init, disableSpecs} from 'jasmine-fail-fast';

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
  // Custom hooks

  /**
   * Wrapper around `jasmine-fail-fast`'s `init`, which must be called in `onPrepare` as follows:
   * `jasmine.getEnv().addReporter(failFast.init());`
   *
   * Yet to find a way of automating this via a Protractor plugin hook. `jasmine` isn't available
   * in `setup`.
   */
  init: function() {
    // Clean up the "fail file" before starting, in case it exists.
    // TODO: Would love to clean up on exit, but yet to find a hook/way to ensure that the file
    // isn't deleted before the last runner exits.
    this.clean();

    return init();
  },

  clean: function() {
    unsetFailed();
  },

  // Protractor hooks
  postTest: function(self, passed) {
    if(!passed) {
      setFailed();
    }

    if(hasFailed()) {
      disableSpecs();
    }
  }
};

function hasFailed() {
  return fs.existsSync(TOUCH_ON_FAIL);
}

function setFailed() {
  fs.closeSync(fs.openSync(TOUCH_ON_FAIL, 'w'));
}

function unsetFailed() {
  if(hasFailed()) {
    fs.unlinkSync(TOUCH_ON_FAIL);
  }
}
