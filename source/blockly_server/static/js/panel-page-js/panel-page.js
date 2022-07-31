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

        document.getElementById("body-table-parameters").insertRow(-1).innerHTML =
        '<tr>' +
        '<td>' + parameter[0]['name'] + '</td>' +
        '<td>' + parameter[2]['default'] + '</td>' +
        '<td>' + '<input type="number" id="'+ i +'" value="' + parameter[1]['value'] + '">' + '</td>' +
        '</tr>';
    }
}

async function saveSettings() {
    let parameters_to_send = parameters;

    for (var i = 0; i < parameters_array.length; i++) {  
        var value = document.getElementById(i).value;
        console.log("value is ", value);
        if( i == 0 )
            parameters_to_send["light_sensor"][1]['value'] = value;
        else if( i == 1 )
            parameters_to_send["line_sensor_center"][1]['value'] = value;
        else if( i == 2 )
            parameters_to_send["line_sensor_left"][1]['value'] = value;
        else if( i == 3 )
            parameters_to_send["line_sensor_right"][1]['value'] = value;
        else if( i == 4 )
            parameters_to_send["motor_left"][1]['value'] = value
        else if( i == 5 )
            parameters_to_send["motor_right"][1]['value'] = value;
        else if( i == 6 )
            parameters_to_send["rotate_90"][1]['value'] = value;
        else if( i == 7 )
            parameters_to_send["sensor_distance"][1]['value'] = value;
        else if( i == 8 )
            parameters_to_send["step"][1]['value'] = value;
    }

    console.log("parameters to send : ", parameters_to_send);
    const result = await sendParameters(parameters_to_send);

    if (result.status == 200) {
       const text = "Η αποθήκευση των ρυμθίσεων ολοκληρώθηκε με επιτυχία!";
       showModalsSuccessSettings(text);
    } else {
        const error_text = "Υπήρξε πρόβλημα κατά την αποθήκευση των ρυθμίσεων του ρομπότ. Οι ρυμθίσεις δεν αποθηκεύτηκαν!";
        showModalErrorInSettings(error_text);
    }
}
