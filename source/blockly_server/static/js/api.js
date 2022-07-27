const baseURL = '';

function axiosClient() {
  let client = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return {
    get(url, params) {
      return client.get(url, { params: params });
    },
    get(url) {
      return client.get(url);
    },
    post(url, data) {
      return client.post(url, data);
    }
  }
}

function deleteProject(id) {
  return axiosClient().get('/delete_project?id='+id);
}

//function newProject(title,info) {
//  return axiosClient().get('/new_project?title='+title+'&info='+info);
//}

function executeScript(id) {
  return axiosClient().get('/execute_script?id='+id);
}

function stopScript() {
  return axiosClient().get('/stop_script');
}

function getXmlCode(id) {
  return axiosClient().get('/send_xml?id='+id);
}

function sendcode(id,code) {
  let obj = {id: id, code: code};
  let data = JSON.stringify(obj);
  return axiosClient().post('/execute_blockly',data);
}

function saveXml(id, code) {
  let obj = { code: code };
  let data = JSON.stringify(obj);
  return axiosClient().post('/save_xml?id='+id, data);
}

// function sendManualControlCommand(command) {
//   return axiosClient().get('/manual_control_command?command='+command);
// }
