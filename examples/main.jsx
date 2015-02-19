import React from 'react';
import { DataChannelMixin } from '../src';

const Chat = React.createClass({

    mixins: [DataChannelMixin],

    getInitialState() {

        return {

            message: '',
            messages: []
        };
    },

    getDefaultProps() {

        return {

            APIKey: ''
        };
    },

    /* DataChannelMixin API Events */

    _onData (data) {

        console.log(data.peer, ':', data.data);

        this.state.messages.push({ id: data.peer, body: data.data });
        this.forceUpdate();
    },

    _onInbound (id) {

        console.log('Inbound connection established with', id);
    },

    _onOutbound (id) {

        console.log('Outbound connection established with', id);
    },

    _onInboundClose (id) {

        console.log('Outbound connection closed', id);
    },

    _onOutboundClose (id) {

        console.log('Inbound connection closed', id);
    },

    /* /DataChannelMixin API Events */

    _send() {

        this.state.messages.push({

            id: this.state.rtc_id,
            body: this.state.message
        });

        this.forceUpdate();

        this.send(this.state.message); // DataChannelMixin API

        console.log('Data has been sent to connected peers!');
    },

    _connect() {

        console.log('Establishing connection with', this.state.target);

        this.connect(this.state.target); // DataChannelMixin API
    },

    _disconnect() {

        console.log('Disconnecting from', this.state.target);

        this.close(this.state.target); // DataChannelMixin API
    },

    _disconnectFromAll() {

        console.log('Disconnecting from all peers!');

        this.close(); // DataChannelMixin API
    },

    _onMsg (event) {

        this.setState({ message: event.target.value });
    },

    _onTarget (event) {

        this.setState({ target: event.target.value });
    },

    render() {

        let messages = this.state.messages.map((msg, index) => {

            if (msg.id === this.state.rtc_id) { msg.id = 'Me'; }

            return <div key={index}><strong>{msg.id + ': '}</strong>{msg.body}</div>;
        });

        return (

            <div>

                <div>Me: {this.state.rtc_id}</div>

                <textarea placeholder='Type in message...' value={this.state.message} onChange={this._onMsg} />
                <div><button onClick={this._send}>Send</button></div>

                <div>
                    <label>Connect to:</label>
                    <input type='text' value={this.state.target} onChange={this._onTarget} />
                    <button onClick={this._connect}>Connect</button>
                </div>

                <div>
                    <label>Disconnect from:</label>
                    <input type='text' value={this.state.target} onChange={this._onTarget} />
                    <button onClick={this._disconnect}>Disconnect</button>
                </div>

                <div>
                    <button onClick={this._disconnectFromAll}>Disconnect from all</button>
                </div>

                <div style={{height: 100}}>{messages}</div>

            </div>
        );
    }
});

React.render(<Chat APIKey='sdysmxpiv1iz4cxr' />, document.body);
