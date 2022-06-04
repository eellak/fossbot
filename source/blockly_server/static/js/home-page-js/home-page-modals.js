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


function showModalNewProjectFolder() {
    document.getElementById("modal-project-folder-space").style.display = 'block';
}

function closeModalNewProjectFolder() {
    document.getElementById("modal-project-folder-space").style.display = 'none';
}

//ERROR 
function showModalErrorInHome(error_text) {
    document.getElementById("modal-error-home").style.display = 'block';
    document.getElementById("modal-error-text").innerHTML = error_text;
}

function hideModalErrorInHome() {
    document.getElementById("modal-error-home").style.display = 'none';
}

//SUCCESS 
function showModalsSuccessInHome(text) {
    document.getElementById("modal-success-home").style.display = 'block';
    document.getElementById("modal-success-text").innerHTML = text;
}

function hideModalSuccessInHome() {
    document.getElementById("modal-success-home").style.display = 'none';
}


