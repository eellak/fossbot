let parameters = new Object();
let parameters_array = [];

function loadSettings(data) {
    console.log('Loading settings of the projects');

    parameters = data.parameters;
    console.log('parameters:', Object.values(parameters));

    parameters_array = Object.values(parameters);

    for (var i = 0; i < parameters_array.length; i++) {
        const parameter = parameters_array[i];

        console.log('parameter:', parameter);

        if(parameter[0]['name'] == "Όνομα ρομπότ") {
            document.getElementById("body-table-parameters").insertRow(-1).innerHTML =
            '<tr>' +
            '<td>' + parameter[0]['name'] + '</td>' +
            '<td>' + parameter[2]['default'] + '</td>' +
            '<td>' + '<input type="text" id="' + i + '" value="' + parameter[1]['value'] + '">' + '</td>' +
            '</tr>';
        } else {
            document.getElementById("body-table-parameters").insertRow(-1).innerHTML =
            '<tr>' +
            '<td>' + parameter[0]['name'] + '</td>' +
            '<td>' + parameter[2]['default'] + '</td>' +
            '<td>' + '<input type="number" id="' + i + '" value="' + parameter[1]['value'] + '">' + '</td>' +
            '</tr>';
        } 
    }
}

async function saveSettings() {
    let parameters_to_send = [];

    for (var i = 0; i < parameters_array.length; i++) {
        var value = document.getElementById(i).value;
        console.log("value is ", value);
        parameters_to_send.push(value);
    }

    console.log("parameters to send : ", parameters_to_send);
    const result = await sendParameters(parameters_to_send);

    if (result.status == 200) {
        window.location.replace('/');
    } else {
        const error_text = "Υπήρξε πρόβλημα κατά την αποθήκευση των ρυθμίσεων του ρομπότ. Οι ρυμθίσεις δεν αποθηκεύτηκαν!";
        showModalError(error_text);
    }
}
