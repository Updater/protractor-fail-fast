# protractor-fail-fast

Allow Protractor tests to "fail-fast", exiting on the first failure instead of running all tests no matter what. This can save a great deal of time as Protractor tests are typically slow and expensive.

This Protractor plugin is effectively a wrapper around [`jasmine-fail-fast`](https://github.com/Updater/jasmine-fail-fast).

## Install
### yarn
```bash
yarn add protractor-fail-fast
```

### npm
```bash
npm install protractor-fail-fast
```

## Fail file
Since test runners run in independent processes, we use a "fail file", `.protractor-fail-fast`,
to communicate between them (better ideas welcome). The "fail file" is created when 
the plugin is initialized and the test runners then continuously check for the presence 
of it. If/when a test runner fails, it will delete the "fail file", signaling to the 
other test runners to stop the test run.

It is recommended that `.protractor-fail-fast` is added to `.gitignore` since this file may be left behind
if all test runners finish successfully. It can removed in the `afterLaunch` (see below), but could still
be left behind if Protractor is shut down prior to executing the hook (crash/forced exit).

## Usage
Inside the Protractor config file:

```javascript
import failFast from 'protractor-fail-fast';

exports.config = {
  plugins: [
    failFast.init(),
  ],
  
  // Optional
  afterLaunch: function() {
    failFast.clean(); // Removes the fail file once all test runners have completed.
  },
}
```

