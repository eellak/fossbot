//send the code from thw workspace to be run in the robot 
function runCode(id) {
  let blockly_code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace);

  if (blockly_code == "") {
    console.log("no code to run");

    //show modal 
    showModalErrorInBlocklyPage("Δεν υπάρχουν μπλοκς στον χώρο εργασίας για να μπορέσει να τρέξει το ρομπότ!")
    return;
  }

  sendcode(id, blockly_code)
    .then(response => {
      if (response.status == 200) {
        showModalsSuccessInBlocklyPage("Ο κώδικας τρέχει με επιτυχία!");
      }
    })

  let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  let xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  saveXml(id, xmlText)
    .then(response => {
      if (response.status == 200) {
        console.log("Ο κώδικας αποθήκευτηκε με επιτυχία!");

        printRealtimePythonScripts(id)
          .then(response => {
            if (response.status == 200) {
              console.log("Ας εμφανισουμε το python script");
              console.log(response.script)
            }
          })
      }
    }) 
    .catch(err => {
      console.log('Error when saving project\n', err);
  });
}

//stop the code that was being exeuted in the robot 
function stop_script() {
  stopScript();
}
