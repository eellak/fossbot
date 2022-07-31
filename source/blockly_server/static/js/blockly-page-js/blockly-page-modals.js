//WELCOME
function showModalWelcome() {
    document.getElementById("modal-welcome").style.display = 'block';
}

function hideModalWelcome() {
    document.getElementById("modal-welcome").style.display = 'none';
}

//EMPTY WORKSPACE
function showModalEmptyWorkspace() {
    document.getElementById("modal-empty-space").style.display = 'block';
}

function closeModalEmptyWorkspace() {
    document.getElementById("modal-empty-space").style.display = 'none';
}

//FILENAME
function showModalFilename() {
    document.getElementById("modal-filename-space").style.display = 'block';
}

function closeModalFilename() {
    document.getElementById("modal-filename-space").style.display = 'none';
}

//ERROR 
function showModalErrorInBlocklyPage(error_text) {
    document.getElementById("modal-error-blockly").style.display = 'block';
    document.getElementById("modal-error-text").innerHTML = error_text;
}

function hideModalErrorInBlocklyPage() {
    document.getElementById("modal-error-blockly").style.display = 'none';
}

//SUCCESS
function showModalsSuccessInBlocklyPage(text) {
    document.getElementById("modal-success-blockly").style.display = 'block';
    document.getElementById("modal-success-text").innerHTML = text;
}

function hideModalSuccessInBlocklyPage() {
    document.getElementById("modal-success-blockly").style.display = 'none';
}

function closeModalwhenClickAnywhere() {
    closeModalEmptyWorkspace()
    hideModalSuccessInBlocklyPage()
    hideModalErrorInBlocklyPage() 
}
