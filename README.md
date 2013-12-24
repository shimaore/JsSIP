JsSIP for Node
==============

This is a fork of [JsSIP](http://www.jssip.net/) for Node.js.

Why?
====

SIP.js is designed for Node.js, but I felt the SIP and SDP parsers, along with the overall stack, of JsSIP was better designed. On the other hand, the developers of JsSIP are targetting the browser and have no interest (at this time?) for Node.js as a target platform.

I needed a SIP environment to do rapid prototyping of a A1/SIP gateway for the OsmoCom project and especially the nice folks over at FairWaves.

Is it compatible with plain JsSIP?
==================================

The browserify version of this project should pass all JsSIP tests.

This means you can use the JsSIP documentation to get started. However, since this implementation is different, please, please report all issues using our [tracker](https://github.com/shimaore/jssip-for-node/issues) rather than JsSIP's, even if it appears the issues is with their code. I'd rather have an extra issue to handle than bother the original developers with something they might not care about and didn't ask for.

How is it different from JsSIP?
===============================

This implementation works on Node.js. JsSIP works in the browser. Currently both versions use WebSocket for transport (I use FreeSwitch as a WebSocket handler), although this version could add native UDP, etc. transports.

This implementation can support RTP proxying with my [RTP Proxy] project on Node.js.

How is it different from sip.js?
================================

This implementation relies on JsSIP for SIP and SDP parsing, and implements the JsSIP API.

Also at this time no native transports (UDP, TCP, TLS) are provided.

Limitations?
============

Plenty. This is designed for experimentation, not for production. This means at least that I'm not primarily interested in stack performance or issues dealing with complex SIP scenarios (e.g. proxies) at this time; however you're welcome to submit pull requests for any type of enhancements.

Support
=======

Please use [github issues](https://github.com/shimaore/jssip-for-node/issues) and [the wiki](https://github.com/shimaore/jssip-for-node/wiki).

Name
====

I choose the name `jssip-for-node` in npm because I felt that if the original JsSIP developers were interested in providing a Node.js implementation of their stack, this was their spot, not mine. I'll be happy to use the name `jssip` if there is consensus, though.
