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
  require('./RTCSession')(JsSIP);
  require('./Message')(JsSIP);
  require('./UA')(JsSIP);
  require('./Utils')(JsSIP);
  require('./SanityCheck')(JsSIP);
  require('./DigestAuthentication')(JsSIP);
  // require('./Subscriber')(JsSIP); /* not present in srcFiles for original JsSIP */

  JsSIP.Grammar = require('./Grammar/dist/Grammar.js')(JsSIP);

  return JsSIP;
}());

JsSIP.setWebRTC = function(module) {
  JsSIP.WebRTC = module;
  if(JsSIP.WebRTC.getUserMedia && JsSIP.WebRTC.RTCPeerConnection && JsSIP.WebRTC.RTCSessionDescription) {
    JsSIP.WebRTC.isSupported = true;
  } else {
    JsSIP.WebRTC.isSupported = false;
  }
}

if(typeof module !== 'undefined') {
  WebSocket = require('ws');
  require('./Transport')(JsSIP,WebSocket); /* FIXME: WebSocket Transport */
  JsSIP.global = global;
  module.exports = JsSIP;
}
if(typeof window !== 'undefined') {
  require('./Transport')(JsSIP,window.WebSocket); /* WebSocket Transport */
  require('./WebRTC')(JsSIP); /* Native WebRTC media (only on browser at this time) */
  JsSIP.global = window;
  window.JsSIP = JsSIP;
}
