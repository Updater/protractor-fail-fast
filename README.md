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

## Usage
Enable `protractor-fail-fast` as a plugin in the Protractor configuration file using the [`package` option](http://www.protractortest.org/#/plugins#using-plugins):

```javascript
plugins: [{
  package: 'protractor-fail-fast',
}]
```

## Fail file
In order to facilitate communication between the test instances (and for the lack of a better known option), `protractor-fail-fast` writes to an empty file, `.protractor-failed`, whenever a test fails. The presence of this file triggers all other test instances to skip the rest of their tests. 

The `init` and `clean` methods will remove this file, but it may still remain if, for example, the `postResults` Protractor hook isn't executed due to an aborted test run. For that reason, it's recommended to add `.protractor-failed` to `.gitignore`.
