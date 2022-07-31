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

function closeModalInBlocklyPageWhenClick() {
    closeModalEmptyWorkspace()
    closeModalFilename()
    hideModalSuccess()
    hideModalError()
}
