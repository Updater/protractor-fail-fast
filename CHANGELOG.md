# Changelog

## 3.0.0
##### Breaking
* Require `protractor` `>= 4.0.4` as a `peerDependency`.

##### Features
* Use new `onPrepare` hook to remove the need for manual configuration. `onPrepare` was added in Protractor [4.0.4](https://github.com/angular/protractor/blob/master/CHANGELOG.md#404). 

  Simplifies installation to just this line in the Protractor config file:
  ```javascript
  plugins: [{
    package: 'protractor-fail-fast',
  }]
  ```
  
* Upgrade Babel from version 5.x to 6.x.

## 2.0.0
##### Breaking
* Require `protractor` `>= 2.2.0` as a `peerDependency`.

##### Fixes
* Make plugin compatible with the new plugin system introduced in `protractor` `2.2.0`.

## 1.0.2
##### Fixes
* Add `protractor` as a `< 2.2.0` `peerDependency` to indicate that `1.x` isn't compatible with `protractor` `2.2.0` and above.
