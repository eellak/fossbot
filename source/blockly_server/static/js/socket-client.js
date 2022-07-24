var socket = io('http://' + document.domain + ':' + location.port);


socket.on("connect", function () {
  console.log("Socket connected!");
  socket.emit('connection', { 'data': 'I\'m connected!' });
});

socket.on('disconnect', () => {
  console.log("Socket disconnected");
  socket.emit('disconnection', { 'data': 'I\'m disconnected!' });
});


function sendManualControlCommand(command) {
  socket.emit('manual_control_command', { 'command': command });

  socket.on('manual_control_command_result', (data) => {
    console.log("manual_control_command_result, data sent:", data);
  });
}


function stopScript() {
  socket.emit('stop_script');
}