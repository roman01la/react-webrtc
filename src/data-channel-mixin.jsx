import React from 'react';

import * as lib from './lib/lib-dc';

const DataChannelMixin = {

    componentWillMount() {

        let remotePeers = {

            inbound: new Set([]),
            outbound: new Set([])
        };

        Object.defineProperty(remotePeers, 'all', {

            get() {

                return new Set([...this.inbound, ...this.outbound]);
            }
        });

        let peer = lib.createPeer(this.props.APIKey);

        lib.handleInbound.call(this, peer, this._onInbound, peer => {

            remotePeers.inbound.add(peer);

            peer.on('close', () => remotePeers.inbound.delete(peer));
        });

        lib.handleOpenPeer.call(this, peer);

        this.connect = id => {

            lib.connect.call(this, peer, id)
                .then(peer => {

                    remotePeers.outbound.add(peer);

                    peer.on('close', () => remotePeers.outbound.delete(peer));
                });
        };

        this.send = data => lib.send(remotePeers.all, data);

        this.close = id => {

            if (id) {

                return remotePeers.all
                        .forEach(peer => {

                            if (peer.peer === id) {

                                lib.closeOne(peer);

                                remotePeers.inbound.has(peer) && remotePeers.inbound.delete(peer);
                                remotePeers.outbound.has(peer) && remotePeers.outbound.delete(peer);
                            }
                        });
            }

            lib.closeAll(remotePeers.all);
            remotePeers.inbound.clear();
            remotePeers.outbound.clear();
        };
    }
};

export default DataChannelMixin;
