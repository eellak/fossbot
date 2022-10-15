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
            '<td>' + '<select name="languages" id="' + i + '"> <option>Ελληνικά</option> <option selected>English</option> </select>' + '</td>' +
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

function setStringsEn() {
    document.getElementById("open-home-href").innerHTML = get_string_translation_en("go_back_to_home_page");
    document.getElementById("panel-title-wrap").innerHTML = get_string_translation_en("panel_title");
    document.getElementById("panel-description-txt").innerHTML = get_string_translation_en("blocks_title");
    document.getElementById("parameter-name-id").innerHTML = get_string_translation_en("parameter_name");
    document.getElementById("default-value-id").innerHTML = get_string_translation_en("default_value");
    document.getElementById("value-id").innerHTML = get_string_translation_en("value");
    document.getElementById("footer-str").innerHTML = get_string_translation_en("footer_string");
    document.getElementById("save-settings-id").innerHTML = get_string_translation_en("save_changes");
    document.getElementById("modal-error-text").innerHTML = get_string_translation_en("error_txt");
    document.getElementById("modal-success-text").innerHTML = get_string_translation_en("success");
}

function setStringsInChosenLanguage(language) {
    if(language=='en') {
      setStringsEn()
    }
  }