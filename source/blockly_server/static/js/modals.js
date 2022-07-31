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


function closeModalSuccessOrErrorwhenClickAnywhere() {
    hideModalSuccess()
    hideModalError()
}
