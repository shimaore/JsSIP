/**
 * @fileoverview WebRTC
 */

module.exports = function(JsSIP) {
var WebRTC;

WebRTC = {};

// getUserMedia
if (JsSIP.global.navigator.webkitGetUserMedia) {
  WebRTC.getUserMedia = JsSIP.global.navigator.webkitGetUserMedia.bind(navigator);
}
else if (JsSIP.global.navigator.mozGetUserMedia) {
  WebRTC.getUserMedia = JsSIP.global.navigator.mozGetUserMedia.bind(navigator);
}
else if (JsSIP.global.navigator.getUserMedia) {
  WebRTC.getUserMedia = JsSIP.global.navigator.getUserMedia.bind(navigator);
}

// RTCPeerConnection
if (JsSIP.global.webkitRTCPeerConnection) {
  WebRTC.RTCPeerConnection = JsSIP.global.webkitRTCPeerConnection;
}
else if (JsSIP.global.mozRTCPeerConnection) {
  WebRTC.RTCPeerConnection = JsSIP.global.mozRTCPeerConnection;
}
else if (JsSIP.global.RTCPeerConnection) {
  WebRTC.RTCPeerConnection = JsSIP.global.RTCPeerConnection;
}

// RTCSessionDescription
if (JsSIP.global.webkitRTCSessionDescription) {
  WebRTC.RTCSessionDescription = JsSIP.global.webkitRTCSessionDescription;
}
else if (JsSIP.global.mozRTCSessionDescription) {
  WebRTC.RTCSessionDescription = JsSIP.global.mozRTCSessionDescription;
}
else if (JsSIP.global.RTCSessionDescription) {
  WebRTC.RTCSessionDescription = JsSIP.global.RTCSessionDescription;
}

// New syntax for getting streams in Chrome M26.
if (WebRTC.RTCPeerConnection && WebRTC.RTCPeerConnection.prototype) {
  if (!WebRTC.RTCPeerConnection.prototype.getLocalStreams) {
    WebRTC.RTCPeerConnection.prototype.getLocalStreams = function() {
      return this.localStreams;
    };
    WebRTC.RTCPeerConnection.prototype.getRemoteStreams = function() {
      return this.remoteStreams;
    };
  }
}

// isSupported attribute.
if (WebRTC.getUserMedia && WebRTC.RTCPeerConnection && WebRTC.RTCSessionDescription) {
  WebRTC.isSupported = true;
}
else {
  WebRTC.isSupported = false;
}

JsSIP.WebRTC = WebRTC;
};
