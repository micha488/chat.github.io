const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Нове підключення');
    broadcast('Приєднався новий користувач');

ws.on('message', (message) => {
    console.log(`&{message}`);
    broadcast(message.toString());
})

ws.on('close', () => {
    clients.delete(ws);
    broadcast('');
    console.log('');
});
});

function broadcast(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}