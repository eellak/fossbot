function stop_script() {
    stopScript();
}

function send_command_for_manual_control(command) {
    var socket = io('http://' + document.domain + ':' + location.port);

    socket.on("connect", function() {
      console.log("Socket connected!");
      socket.emit('connection', {'data': 'I\'m connected!'});
      socket.emit('manual_control_command', command);
    });

    socket.on('disconnect', () => {
      console.log("Socket disconnected");
      socket.emit('disconnection', {'data': 'I\'m disconnected!'});
    });

    socket.on('manual_control_command_result', (data) => {
      console.log("manual_control_command_result, data sent:", data);
    });
}
