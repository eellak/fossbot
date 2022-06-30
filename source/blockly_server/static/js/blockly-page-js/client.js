//send the code from thw workspace to be run in the robot 
async function runCode(id) {
    let blockly_code = Blockly.Python.workspaceToCode(Blockly.mainWorkspace);

    if (blockly_code == "") {
        console.log("no code to run");

        //show modal 
        showModalErrorInBlocklyPage("Δεν υπάρχουν μπλοκς στον χώρο εργασίας για να μπορέσει να τρέξει το ρομπότ!")
        return;
    }

    try {
        const sendResultCode = await sendcode(id, blockly_code)
        if (sendResultCode.status == 200) {
            showModalsSuccessInBlocklyPage("Ο κώδικας τρέχει με επιτυχία!");
        }
    } catch (err) {
        console.log('Error when sending the blockly code\n', err);
    }

    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    try {
        const saveXmlResult = await saveXml(id, xmlText)

        if (saveXmlResult.status == 200) {
            console.log("Ο κώδικας αποθήκευτηκε με επιτυχία!");
        }
    } catch (err) {
        console.log('Error when saving the xml\n', err);
    }

    printRealtimePythonScripts(id)
        .then(response => {
            if (response.status == 200) {
                console.log("Ας εμφανισουμε το python script");
                console.log(response.data.script)
            }
        })
        .catch(err => {
            console.log('Error when getting the python script\n', err);
        })
}

//stop the code that was being exeuted in the robot 
function stop_script() {
    stopScript();
}
