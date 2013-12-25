/*global console: false*/

/**
 * @name JsSIP
 * @namespace
 */
var JsSIP = (function() {
  "use strict";

  var JsSIP = {};
  var pkg = require('../package.json');

  Object.defineProperties(JsSIP, {
    version: {
      get: function(){ return pkg.version; }
    },
    name: {
      get: function(){ return pkg.title; }
    }
  });

  require('./EventEmitter')(JsSIP);
  require('./Constants')(JsSIP);
  require('./Exceptions')(JsSIP);
  require('./Timers')(JsSIP);
  require('./Parser')(JsSIP);
  require('./SIPMessage')(JsSIP);
  require('./URI')(JsSIP);
  require('./NameAddrHeader')(JsSIP);
  require('./Transactions')(JsSIP);
  require('./Dialogs')(JsSIP);
  require('./RequestSender')(JsSIP);
  require('./InDialogRequestSender')(JsSIP);
  require('./Registrator')(JsSIP);
  require('./Message')(JsSIP);
  require('./Utils')(JsSIP);
  require('./SanityCheck')(JsSIP);
  require('./DigestAuthentication')(JsSIP);
  // require('./Subscriber')(JsSIP); /* not present in srcFiles for original JsSIP */

  JsSIP.Grammar = require('./Grammar/dist/Grammar.js');

  return JsSIP;
}());
if(typeof window === 'undefined') {
  module.exports = JsSIP;
  JsSIP.global = global;
} else {
  window.JsSIP = JsSIP;
  require('./RTCSession')(JsSIP); /* A generic RTCSession; however RTCSession/RTCMediaHandler depends on WebRTC */
  require('./Transport')(JsSIP); /* WebSocket Transport */
  require('./WebRTC')(JsSIP); /* WebRTC media (only on browser at this time) */
  require('./UA')(JsSIP); /* WebSocket + WebRTC UA */
  JsSIP.global = window;
}
