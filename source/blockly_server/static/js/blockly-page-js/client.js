//send the code from thw workspace to be run in the robot 
async function runCode(id) {
  let blockly_code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace);

  if (blockly_code == "") {
    console.log("no code to run");

    //show modal
    showModalError("Δεν υπάρχουν μπλοκς στον χώρο εργασίας για να μπορέσει να τρέξει το ρομπότ!")
    return;
  }

  const result = await sendCode(id, blockly_code)
  const status = result.status
  if (status == 'started'){
    showModalSuccess("Ο κώδικας τρέχει με επιτυχία!");
  }
  let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  let xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  const result_save = await saveXml(id, code)

  if (result_save.status == 200) {
    console.log("Ο κώδικας αποθήκευτηκε με επιτυχία!");
  }
}

//stop the code that was being exeuted in the robot 
function stop_script() {
  stopScript();
}
