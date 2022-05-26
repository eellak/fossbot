var EasyJ = {};
EasyJ.robotClass = "MyRobot";

function exportCode() {
    const xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    if (xmlText == "<xml xmlns=\"https://developers.google.com/blockly/xml\"></xml>") {
        showModalEmptyWorkspace();
        return;
    }
    showModalFilename();

    document.getElementById("button-file-name").onclick = function () {
        //get the input value 
        let filename = document.getElementById("filename-text").value

        //close the modal 
        closeModalFilename();  
        
        //save the file with a filename
        if (filename != null || filename != "") {
            EasyJ.robotClass = filename;
        }
        EasyJ.Xml.download(xmlText, EasyJ.robotClass + ".xml");

        //empty the input value 
        document.getElementById("filename-text").value = " "; 
    }
}

EasyJ.Xml = {};

EasyJ.Xml.download = function (text, filename) {
    if (typeof filename === "undefined") {
        filename = false;
    };
    let pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    if (filename) {
        pom.setAttribute('download', filename);
    }
    pom.click();
};

//save xml to db
function save_xml(id) {
    let xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    saveXml(id, xmlText)
}