let parameters = new Object();
let parameters_array = [];

function loadSettings(data) {
    console.log('Loading settings of the projects');

    parameters = data.parameters;
    console.log('parameters:', Object.values(parameters));

    parameters_array = Object.values(parameters);

    for (var i = 0; i < parameters_array.length; i++) {
        const parameter = parameters_array[i];
        if(parameter[0]['name'] == "Όνομα ρομπότ") {
            document.getElementById("body-table-parameters").insertRow(-1).innerHTML =
            '<tr>' +
            '<td>' + parameter[0]['name'] + '</td>' +
            '<td>' + parameter[2]['default'] + '</td>' +
            '<td>' + '<input type="text" id="' + i + '" value="' + parameter[1]['value'] + '">' + '</td>' +
            '</tr>';
        } else if ( parameter[0]['name']  == "Γλώσσα") {
            document.getElementById("body-table-parameters").insertRow(-1).innerHTML =
            '<tr>' +
            '<td>' + parameter[0]['name'] + '</td>' +
            '<td>' + parameter[2]['default'] + '</td>' +
            '<td>' + '<input list="languages" id="' + i + '" value="' + parameter[1]['value'] + '" />' + 
                ' <datalist id="languages"> <option value="Ελληνικά"> <option value="English"> </datalist>' + 
            '</td>' +
            '</tr>';
        }else {
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
        parameters_to_send.push(value);
    }

    const result = await sendParameters(parameters_to_send);

    if (result.status == 200) {
        window.location.replace('/');
    } else {
        const error_text = "Υπήρξε πρόβλημα κατά την αποθήκευση των ρυθμίσεων του ρομπότ. Οι ρυμθίσεις δεν αποθηκεύτηκαν!";
        showModalError(error_text);
    }
}

function setStrings() {
    document.getElementById("open-home-href").value = get_string_translation("go_back_to_home_page");
    document.getElementById("panel-title-wrap").value = get_string_translation("panel_title");
    document.getElementById("panel-description-txt").value = get_string_translation("blocks_title");
    document.getElementById("parameter-name-id").value = get_string_translation("parameter_name");
    document.getElementById("default-value-id").value = get_string_translation("default_value");
    document.getElementById("value-id").value = get_string_translation("value");
    document.getElementById("footer-str").value = get_string_translation("footer_string");
    document.getElementById("save-settings-id").value = get_string_translation("save_changes");
    document.getElementById("modal-error-text").value = get_string_translation("error_txt");
    document.getElementById("modal-success-text").value = get_string_translation("success");
}