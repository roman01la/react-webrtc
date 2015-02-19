import Peer from 'peerjs';

function ifFn (fn) {

    typeof fn === 'function' && fn();
}

function onClose (peer, type) {

    type === 'outbound' && this._onOutboundClose.call(this, peer);
    type === 'inbound' && this._onInboundClose.call(this, peer);
}

function consumeConnection (socket) {

    socket.on('data', data => {

        ifFn(this._onData.bind(this, { peer: socket.peer, data }));
    });
}

export function createPeer (key) {

    return new Peer({ key });
}

export function handleInbound (peer, handler, callback) {

    peer.on('connection', socket => {

        ifFn(handler.bind(this, socket.peer));
        callback(socket);
        consumeConnection.call(this, socket);
        socket.on('close', onClose.bind(this, socket.peer, 'inbound'));
    });
}

export function handleOpenPeer (peer) {

    peer.on('open', () => this.setState({ rtc_id: peer.id }));
}

export function connect (peer, id) {

    return new Promise((resolve, reject) => {

        let remotePeer = peer.connect(id);

        resolve(remotePeer);

        remotePeer.on('open', ifFn.bind(this, this._onOutbound.bind(this, remotePeer.peer)));
        remotePeer.on('close', onClose.bind(this, remotePeer.peer, 'outbound'));

        consumeConnection.call(this, remotePeer);
    });
}

export function send (peers, data) {

    peers.forEach(peer => peer.send(data));
}

export function closeOne (peer) {

    peer.close()
}

export function closeAll (peers) {

    peers.forEach(peer => peer.close());
}
