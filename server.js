const io = require('socket.io')(3000);
const users = {};

io.on('connection', (socket) => {
	socket.on('new-user', (name) => {
		users[socket.id] = name;
		socket.broadcast.emit('user-connected', name);
	});
	socket.on('send-chat-message', (message) => {
		socket.broadcast.emit('chat-massage', { message: message, name: users[socket.id] });
	});
	socket.on('disconnected', () => {
		socket.broadcast.emit('user-disconnected', users[ocket.id]);
		delete users[socket.id];
	});
});
