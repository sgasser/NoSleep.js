'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mediaFile = require('./media.js');

// Detect iOS browsers < version 10
var oldIOS = typeof navigator !== 'undefined' && parseFloat(('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) < 10 && !window.MSStream;

var NoSleep = function () {
  function NoSleep() {
    _classCallCheck(this, NoSleep);

    if (oldIOS) {
      this.noSleepTimer = null;
    } else {
      // Set up no sleep video element
      this.noSleepVideo = document.createElement('video');

      this.noSleepVideo.setAttribute('playsinline', '');
      this.noSleepVideo.setAttribute('src', mediaFile);

      this.noSleepVideo.addEventListener('timeupdate', function (e) {
        if (this.noSleepVideo.currentTime > 0.5) {
          this.noSleepVideo.currentTime = Math.random();
        }
      }.bind(this));
    }
  }

  _createClass(NoSleep, [{
    key: 'enable',
    value: function enable() {
      if (oldIOS) {
        this.disable();
        this.noSleepTimer = window.setInterval(function () {
          window.location.href = '/';
          window.setTimeout(window.stop, 0);
        }, 15000);
      } else {
        this.noSleepVideo.play();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (oldIOS) {
        if (this.noSleepTimer) {
          window.clearInterval(this.noSleepTimer);
          this.noSleepTimer = null;
        }
      } else {
        this.noSleepVideo.pause();
      }
    }
  }]);

  return NoSleep;
}();

;

module.exports = NoSleep;
