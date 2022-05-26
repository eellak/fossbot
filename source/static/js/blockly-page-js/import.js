function importCode() {
  const file = document.getElementById('fileUpload').files[0];

  const fileReader = new FileReader();
  fileReader.readAsText(file);

  fileReader.onload = function () {
    console.log("file import result")
    console.log(fileReader.result);

    if( fileReader.result == "undefined" ||  fileReader.result ==  "<xml xmlns=\"https://developers.google.com/blockly/xml\"></xml>" ){
      alert("Το αρχείο που επιλέξατε δεν περιέχει κάποια εντολή")
      return; 
    }
    loadXml(fileReader.result);
  }

}


function loadXml(xml) {
  const dom = Blockly.Xml.textToDom(xml);
  Blockly.mainWorkspace.clear();
  Blockly.Xml.domToWorkspace(dom, Blockly.mainWorkspace);
}