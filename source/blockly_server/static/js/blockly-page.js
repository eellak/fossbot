//save xml to db
async function save_xml(id) {
  let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  let xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  const result = await saveXml(id, xmlText)
  const status = result.status
  if (status == '200') {
    showModalSuccess("Ο κώδικας αποθηκεύτηκε με επιτυχία!");
  } else {
    showModalError("Υπήρξε σφάλμα κατά την αποθήκευση του κώδικα! Ξαναπροσπάθησε!")
  }
}

function loadXml(xml) {
  const dom = Blockly.Xml.textToDom(xml);
  Blockly.mainWorkspace.clear();
  Blockly.Xml.domToWorkspace(dom, Blockly.mainWorkspace);
}

//get all projects from db  
async function loadProject() {
  const url_str = window.location.href;
  console.log(url_str)

  var url = new URL(url_str);
  var id = url.searchParams.get("id");
  console.log("project is id", id);

  if (id) {
    //only if the project is saved, it will have an id , so we can retrieve the xml code 
    //get project code from BE based on id 
    const result = await sendXml(id);
    console.log("result", result)
    if (result.status == '200')
      loadXml(result.data);
    else {
      console.log('Error when getting project\n', err);
      showModalError("Υπήρξε σφάλμα στην διαδικασία να φορτώσει ο κώδικας! Παρακαλώ ξαναπροσπάθησε!");
    }
  }
}


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
  if (status == 'started') {
    showModalSuccess("Ο κώδικας τρέχει με επιτυχία!");
  }
  let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  let xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  const result_save = await saveXml(id, xmlText);

  if (result_save.status == 200) {
    console.log("Ο κώδικας αποθήκευτηκε με επιτυχία!");
  }
}

//stop the code that was being exeuted in the robot 
function stop_script() {
  stopScript();
}