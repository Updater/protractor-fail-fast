# protractor-fail-fast

Allow Protractor tests to "fail-fast", exiting on the first failure instead of running all tests no matter what. This can save a great deal of time as Protractor tests are typically slow and expensive.

This Protractor plugin is essentially a wrapper around `jasmine-fail-fast`, solving the problem of halting multiple Protractor instances once one of them has failed. Otherwise, a multi-capability Protractor test will take as long as the longest running test instance, potentially as long as if `jasmine-fail-fast` wasn't applied at all.

## Install
```bash
npm install protractor-fail-fast
```

## Usage
In the Protractor conf:

```javascript
var failFast = require('protractor-fail-fast');

exports.config = {
  plugins: [{
    package: 'protractor-fail-fast'
  }],

  onPrepare: function() {
    jasmine.getEnv().addReporter(failFast.init());
  },
  
  afterLaunch: function() {
    failFast.clean(); // Cleans up the "fail file" (see below)
  }  
}

```

## Fail file
In order to facilitate communication between the test instances (and for the lack of a better known option), `protractor-fail-fast` writes to an empty file, `.protractor-failed`, whenever a test fails. The presence of this file triggers all other test instances to skip the rest of their tests. 

The `init` and `clean` methods will remove this file, but it may still remain if, for example, the `afterLaunch` Protractor hook isn't executed due to an aborted test run. For that reason, it's recommended to add `.protractor-failed` to `.gitignore`.
