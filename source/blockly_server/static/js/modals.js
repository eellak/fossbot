//ERROR
function showModalError(error_text) {
    document.getElementById("modal-error").style.display = 'block';
    document.getElementById("modal-error-text").innerHTML = error_text;
}

function hideModalError() {
    document.getElementById("modal-error").style.display = 'none';
}

//SUCCESS
function showModalSuccess(text) {
    document.getElementById("modal-success").style.display = 'block';
    document.getElementById("modal-success-text").innerHTML = text;
}

function hideModalSuccess() {
    document.getElementById("modal-success").style.display = 'none';
}

//CLOSE MODALS WHEN CLICK ANYWHERE 
function closeModalSuccessOrErrorwhenClickAnywhere() {
    hideModalSuccess()
    hideModalError()
}

//AREA: MODALS FOR HOME-PAGE.HTML
function showModalNewProjectName() {
    document.getElementById("modal-projectname-space").style.display = 'block';
}

function showModalNewProjectDescription() {
    document.getElementById("modal-project-description-space").style.display = 'block';
}

function closeModalNewProjectName() {
    document.getElementById("modal-projectname-space").style.display = 'none';
}

function closeModalNewProjectDescription() {
    document.getElementById("modal-project-description-space").style.display = 'none';
}

function closeModalsInHomeWhenClickAnywhere() {
    if(document.getElementById("modal-projectname-space").style.display == 'block') {
        closeModalNewProjectName() 
    }
    if(document.getElementById("modal-project-description-space").style.display == 'block') {
        closeModalNewProjectDescription()
    }
    closeModalSuccessOrErrorwhenClickAnywhere()
}
//END-AREA: MODALS FOR HOME-PAGE.HTML