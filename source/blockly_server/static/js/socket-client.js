var socket = io('http://' + document.domain + ':' + location.port);

socket.on("connect", function () {
  console.log("Socket connected!");
  socket.emit('connection', { 'data': 'I\'m connected!' });
});

socket.on('disconnect', () => {
  console.log("Socket disconnected");
  socket.emit('disconnection', { 'data': 'I\'m disconnected!' });
});

const deleteProject = function (id) {
  return new Promise(function (resolve, reject) {
    socket.emit('delete_project', { project_id: id });

    socket.on('delete_project_result', (data) => {
      console.log("deleted project result:", data);
      resolve(data);
    });
  });
}

const newProject = function (title_name,infos) {
  return new Promise(function(resolve, reject) {
    socket.emit('new_project', { title: title_name, info: infos });

    socket.on('new_project_result', (data) => {
      console.log("new_project, id given from server:", data);
      resolve(data);
    });
  });
}

const executeScript = function(project_id) {
  return new Promise(function (resolve, reject) {
    socket.emit('execute_script', { 'project_id': project_id });

    socket.on('execute_script_result', (data) => {
      console.log("execute_script_result:", data);
      resolve(data.status);
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

const sendXml = function (id) {
  return new Promise(function(resolve, reject) {
    socket.emit('send_xml', { 'id': id });

    socket.on('send_xml_result', (data) => {
      console.log("send_xml_result", data);
      resolve(data);
    });
  });
}

const saveXml = function(id, code) {
  return new Promise(function (resolve, reject) {
    let obj = { 'id': id, 'code': code };
    //let data = JSON.stringify(obj);
    socket.emit('save_xml', obj);

    socket.on('save_xml_result', (data) => {
      console.log("save_xml_result", data);
      resolve(data);
    });
  });
}

const sendCode = function(id,code) {
  return new Promise(function (resolve, reject) {
    let obj = {'id': id, 'code': code};
    socket.emit('execute_blockly', obj);

    socket.on('execute_blockly_result', (data) => {
      console.log("execute_blockly_result", data);
      resolve(data);
    });
  });
}

const sendParameters = function(data) {
  return new Promise(function (resolve, reject) {
    socket.emit('save_parameters', {'parameters': data});

    socket.on('save_parameters_result', (data) => {
      console.log("save_parameters_result", data);
      resolve(data);
    });
  });
}