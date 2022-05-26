function loadSettings() {
    console.log('load settings of the projects');

    //get the projects 
    getSettings()
        .then(response => {
            console.log(response.data.settings);
            if (response.data.length === 0 || response.data === undefined) {
                //no settings found 
                const error_text = "Δεν βρέθηκαν ρυθμίσεις για το συγκεκριμένο ρομπότ!";
                showModalErrorInSettings(error_text);
            } else {
                //TODO ++ make sure that lenght is 1, otherwise let the user know  
                //if the array has more than 1 settings, it is getting the last settinghs found in the array 
                showSettings(response.data.settings);
            }
        })
        .catch(err => {
            console.log('Error when getting projects\n', err);
            const error_text = "Υπήρξε πρόβλημα κατά την φόρτωση των ρυθμίσεων του ρομπότ. Οι ρυμθίσεις δεν φορτώθηκαν σωστά!";
            showModalErrorInSettings(error_text);
        });
}

function showSettings(settings) {
    let robot_id;
    let rotation;
    let steps;
    let robot_name;
    for (let i = 0; i < settings.length; i++) {
        robot_id = settings[i].id;
        robot_name = settings[i].robot_name;
        rotation = settings[i].rotation;
        steps = settings[i].steps;
    }

    document.getElementById("id-robot").innerHTML = robot_id;
    document.getElementById("robot-name").value = robot_name;
    document.getElementById("rotation-degrees").value = rotation;
    document.getElementById("steps-number").value = steps;
}

function saveSettings() {
    const id_robot = document.getElementById("id-robot").innerHTML;
    const robot_name = document.getElementById("robot-name").value;
    const rotation = document.getElementById("rotation-degrees").value;
    const steps_number = document.getElementById("steps-number").value;

    var obj = new Object();
    obj.robot = robot_name;
    obj.rotation = rotation;
    obj.steps = steps_number;

    //convert object to json string
    var data_string = JSON.stringify(obj);
    console.log(data_string);

    //save settings 
    postSettings(data_string)
        .then(response => {
            if (response.status == 200) {
                const text = "Η αποθήκευση των ρυμθίσεων ολοκληρώθηκε με επιτυχία!";
                showModalsSuccessSettings(text);
            }
        })
        .catch(err => {
            console.log('Error when saving new settings\n', err);
            const error_text = "Υπήρξε πρόβλημα κατά την αποθήκευση των ρυθμίσεων του ρομπότ. Οι ρυμθίσεις δεν αποθηκεύτηκαν!";
            showModalErrorInSettings(error_text);
        });
}