import { existsSync, openSync, closeSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import { init, disableSpecs } from 'jasmine-fail-fast';

/**
 * protractor-fail-fast
 *
 * Since test runners run in independent processes, we use a "fail file", `.protractor-fail-fast`,
 * to communicate between them (better ideas welcome). The "fail file" is created when
 * the plugin is initialized and the test runners then continuously check for the presence
 * of it. If/when a test runner fails, it will delete the "fail file", signaling to the
 * other test runners to stop the test run.
 */
const FAIL_FILE = resolve(process.cwd(), './.protractor-fail-fast');

export default {
  init: () => {
    // Create the fail file at the beginning of the test run. This cannot take place inside
    // the plugin hooks since each test runner creates its own instance of the plugin,
    // causing race conditions. `init` is assumed to be run inside the Protractor config file,
    // thereby executing only once and prior to the test runners being created.
    createFailFile();

    // Returns the plugin in the "inline" format:
    // http://www.protractortest.org/#/plugins#using-plugins
    // Only way to force the user to call `init` to use the plugin.
    return {
      inline: {
        onPrepare: function () {
          init();
        },

        postTest: function (passed) {
          if (!passed) {
            deleteFailFile();
          }

          if (hasFailed()) {
            disableSpecs();
          }
        },
      },
    }
  },

  clean: () => {
    deleteFailFile();
  },
}

function hasFailed() {
  return !existsSync(FAIL_FILE);
}

function createFailFile() {
  closeSync(openSync(FAIL_FILE, 'w'));
}

function deleteFailFile() {
  unlinkSync(FAIL_FILE);
}
