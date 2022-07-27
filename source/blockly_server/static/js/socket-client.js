var socket = io('http://' + document.domain + ':' + location.port);


socket.on("connect", function () {
  console.log("Socket connected!");
  socket.emit('connection', { 'data': 'I\'m connected!' });
});

socket.on('disconnect', () => {
  console.log("Socket disconnected");
  socket.emit('disconnection', { 'data': 'I\'m disconnected!' });
});

const newProject = function (title_name,infos) {
  return new Promise(function(resolve, reject) {
    socket.emit('new_project', { title: title_name, info: infos });

    socket.on('new_project_result', (data) => {
      console.log("new_project, id given from server:", data);
      resolve(data);
    });
  });
}

function sendManualControlCommand(command_name) {
  socket.emit('manual_control_command', { command: command_name });

  socket.on('manual_control_command_result', (data) => {
    console.log("manual_control_command_result, data sent:", data);
  });
}


function stopScript() {
  socket.emit('stop_script');
}
