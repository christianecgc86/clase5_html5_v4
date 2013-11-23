var http = require('http');
var fs = require("fs");
var socketio = require("socket.io");
var validator = require('validator');

var PORT = 8888;
var IPADDRESS = '127.0.0.1';

var app = http.createServer(function(request, response) {

	fs.readFile("cliente.html", function(error, data) {

		response.writeHead(200, {
			'Content-Type' : 'text/html'
		});
		response.write(data);
		response.end();
	});

});

app.listen(PORT);

var io = socketio.listen(app);

io.sockets.on("connection", function(socket) {

	socket.on("mensaje_al_servidor", function(data) {
		var mensajeUsuario = validator.sanitize(data.mensaje).escape();
		var nombreUsuario = validator.sanitize(data.usuario).escape();

		io.sockets.emit("mensaje_al_cliente", {
			mensaje : mensajeUsuario,
			usuario : nombreUsuario
		});
	});

}); 

console.log("servidor corriendo en IP:" + IPADDRESS);
console.log("servidor corriendo en puerto:" + PORT);
