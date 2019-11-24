// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({server});

//broadcast the incoming message to all clients
wss.broadcast = function broadcast(data) {
    if (data.type) {
        switch (data.type) {
            case 'postMessage':
                data.type = 'incomingMessage';
                break;
            case 'postNotification':
                data.type = 'incomingNotification';
                break;
        }
    }
    wss.clients.forEach(function each(client) {
        console.log('in websocket client loop --> ', client);
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('websocket incoming: ws ultron_id --> ', ws._ultron_id);
    const clientCount = {clients: wss.clients.size, type: 'clientCount'};
    wss.broadcast(clientCount);
    ws.on('message', incoming = (message) => {
        let currentMessage = JSON.parse(message);
        currentMessage['id'] = uuidv4();
        if (currentMessage.type === 'clientCount') {
            currentMessage.clientsConnected['clients'] = wss.clients.size;
        }
        wss.broadcast(currentMessage);
    });
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        const clientCount = {clients: wss.clients.size, type: 'clientCount'};
        wss.broadcast(clientCount);
        console.log('Client disconnected');
    });
});
