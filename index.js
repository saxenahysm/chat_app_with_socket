var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {                                                           // for conection localhost
    console.log('conenction Done & listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect',() => {
        console.log('Disconnected');
    });

    socket.on('Created',(data) => {
        socket.broadcast.emit('Created',(data))
    });

    socket.on('chat-message',(data) => {
        socket.broadcast.emit('chat-message',(data))
    });

    socket.on('typing',(data) => {
        socket.broadcast.emit('typing',(data))
    });

    socket.on('stopTyping',(data) => {
        socket.broadcast.emit('stopTyping',(data))
    });
});