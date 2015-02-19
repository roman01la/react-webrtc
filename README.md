# React WebRTC

WebRTC React mixins for real-time communication in React components using [PeerJS](https://github.com/peers/peerjs) library. Read more on how [PeerJS](http://peerjs.com/docs) works.

## WIP

This is WIP, check [Todo](#todo). More features will come soon.

## Installation

This package requires `webpack` and [`babel-loader`](https://github.com/babel/babel-loader). Check [`webpack.config.js`](./webpack.config.js) for build configuration.

`npm install react-webrtc`

## Mixins

### DataChannelMixin (P2P data transmission)

This mixin extends React component with API call functions and event handling interface.

Also component's state will be populated with `rtc_id` property, which is a session ID for current peer.

#### API

- `.connect(id)` — connect to remote peer by its `id`.
- `.send(data)` — send data to all connected peers.
- `.close(id)` — close all connections or specified by `id`.

#### Interface

- `._onData (data) {...}` — handle incoming data.
- `._onInbound (id) {...}` — handle inbound connection.
- `._onInboundClose (id) {...}` — handle closed inbound connection.
- `._onOutbound (id) {...}` — handle outbound connection.
- `._onOutboundClose (id) {...}` — handle closed outbound connection.

## Usage

Check [`examples`](https://github.com/roman01la/react-webrtc/blob/master/examples/) directory.

## Development

`npm install && npm start`

Go to [localhost:3000/examples/](http://localhost:3000/examples/)

## Todo

- [x] DataChannel
- [ ] MediaStream
