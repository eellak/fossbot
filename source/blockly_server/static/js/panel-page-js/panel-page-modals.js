//ERROR WHILE GETTING/ SAVING SETTINGS
function showModalErrorInSettings(error_text) {
    document.getElementById("modal-error-settings").style.display = 'block';
    document.getElementById("modal-error-text").innerHTML = error_text;
}

function hideModalErrorInSettings() {
    document.getElementById("modal-error-settings").style.display = 'none';
}

//SUCCESS IN SAVING SETTINGS 
function showModalsSuccessSettings(text) {
    document.getElementById("modal-success-settings").style.display = 'block';
    document.getElementById("modal-success-text").innerHTML = text;
}

function hideModalSuccessSettings() {
    document.getElementById("modal-success-settings").style.display = 'none';
}
