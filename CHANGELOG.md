# Changelog
## 3.1.0
* Add `abortAllShards` option to [better support sharding tests](https://github.com/Updater/protractor-fail-fast/issues/3).

## 3.0.2

##### Fixes
* Catch error when attempting to remove already removed fail file.

## 3.0.0/3.0.1
NOTE: `3.0.1` technically contains breaking changes with respect to `3.0.0`.
However, since `3.0.0` was DOA, we're breaking with semver and releasing `3.0.1` as a patch anyway.

##### Breaking
* Require `protractor` `>= 4.0.4` as a `peerDependency`.
* Rename "fail file" from `.protractor-failed` to `.protractor-fail-fast`.
* Plugin installation changed. Inside the Protractor config file:

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

##### Fixes
* Upgrade Babel from version 5.x to 6.x.

## 2.0.0
##### Breaking
* Require `protractor` `>= 2.2.0` as a `peerDependency`.

##### Fixes
* Make plugin compatible with the new plugin system introduced in `protractor` `2.2.0`.

## 1.0.2
##### Fixes
* Add `protractor` as a `< 2.2.0` `peerDependency` to indicate that `1.x` isn't compatible with `protractor` `2.2.0` and above.
