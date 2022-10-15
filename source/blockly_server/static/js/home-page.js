//attributes for adding a new project 
let new_project_title;
let new_project_description;

function loadProjects(data) {
    console.log('load projects');

    //get the array with the projects
    const projects_array = data.data;
    const current_language = data.language;

    // const rows = document.getElementById("body-table-projects").rows.length;
    // if(rows >0){
    //     for(var i=1; i<=rows; i++) {
    //         document.getElementById("body-table-projects").deleteRow(i);
    //     }
    //     location.reload();
    // }

    for (var i = 0; i < projects_array.length; i++) {
        const project = projects_array[i];
        if (current_language == 'en') {
            showNewProject(project['title'], project['info'], project['project_id'], get_string_translation_en("execution"), get_string_translation_en("edit"), get_string_translation_en("delete"));
        } else {
            showNewProject(project['title'], project['info'], project['project_id'], get_string_translation_el("execution"), get_string_translation_el("edit"), get_string_translation_el("delete"));
        }
    }
}

function showNewProject(title, info, project_id, string_execution, string_edit, string_delete) {
    //add every time the the project name as the last row
    document.getElementById("body-table-projects").insertRow(-1).innerHTML =
        '<tr>' +
        '<td>' + title + '</td>' +
        '<td>' + info + '</td>' +
        '<td>' + project_id + '</td>' +
        '<td> <div id="run-Blockly-Button-container" class="run-Blockly-Button-container">' +
        '<div id="run-Blockly-Button-wrap" class="run-Blockly-Button-wrap">' +
        '<button onclick="execute_script(' + project_id + ')" type="button" class="run-Blockly" id="open-Blockly">' +
        string_execution +
        '</button>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '<td> <div id="open-Blockly-Button-container" class="open-Blockly-Button-container">' +
        '<div id="open-Blockly-Button-wrap" class="open-Blockly-Button-wrap">' +
        '<button type="button" class="open-Blockly" id="open-Blockly">' +
        '<a href="/blockly?id=' + project_id + '" id="open-Blockly-href" style="color: white; text-decoration: none;">' +
        string_edit +
        '</a>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '<td>   <div id="delete-Blockly-Button-container" class="delete-Blockly-Button-container">' +
        '<div id="delete-Blockly-Button-wrap" class="delete-Blockly-Button-wrap">' +
        '<button onclick="deleteElement(this,' + project_id + ')" type="button" class="delete-Blockly" id="open-Blockly">' +
        '<a id="open-Blockly-href" style="color: white; text-decoration: none;">' +
        string_delete +
        '</a>' +
        '</button>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '</tr>';
}

function createNewProject() {
    //title 
    showModalNewProjectName();

    document.getElementById("button-project-name").onclick = function () {
        //get the input value 
        new_project_title = document.getElementById("project-name-text").value

        if (new_project_title != '') {
            //close the modal 
            closeModalNewProjectName();

            //empty the input value 
            document.getElementById("project-name-text").value = " ";

            //open decription modal
            showModalNewProjectDescription()
        }
    }

}

async function getDescription() {
    //get the input value 
    new_project_description = document.getElementById("project-description-text").value

    if (new_project_description != '') {
        //close the modal 
        closeModalNewProjectDescription();

        //empty the input value 
        document.getElementById("project-description-text").value = " ";

        const result = await newProject(new_project_title, new_project_description)
        console.log('result is ', result)
        window.location.replace('/blockly?id=' + result.project_id)
    }
}

async function deleteElement(el, id) {
    var tbl = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var row = el.parentNode.parentNode.parentNode.parentNode.rowIndex;

    const result = await deleteProject(id)
    if (result.status == '200') {
        tbl.deleteRow(row);
        location.reload();
    }
}

async function execute_script(project_id) {
    const result = await executeScript(project_id)
    if (result == "file not found") {
        showModalError("Δεν βρέθηκε εκτελέσιμος κώδικας!")
    } else if (result == "started") {
        showModalSuccess("Η εκτέλεση έχει ξεκινήσει!")
    } else {
        showModalSucces("Το πρόγραμμα εκτελείται ήδη!")
    }

}

function stop_script() {
    stopScript();
}

function showRobotName() {
    var hostname = window.location.hostname;
    let array = hostname.split("-").join(" ").split(".").join(" ");
    array = array.split(" ", 2)
    if (array[0] && array[1]) {
        document.getElementById("robot-name").innerHTML = array[0] + " " + array[1]
    } else {
        document.getElementById("robot-name").innerHTML = window.location.hostname
    }
}

function setStringsEn() {
    document.getElementById("page-decription").innerHTML = get_string_translation_en("home_title");
    document.getElementById("manual-control-id").innerHTML = get_string_translation_en("manual_use");
    document.getElementById("open-panel-id-txt").innerHTML = get_string_translation_en("open_control_page");
    document.getElementById("add-new-project").innerHTML = get_string_translation_en("add_new_project");
    document.getElementById("head-title-id").innerHTML = get_string_translation_en("title");
    document.getElementById("head-info-id").innerHTML = get_string_translation_en("info");
    document.getElementById("stop-blockly-button").innerHTML = get_string_translation_en("stop_immediately");
    document.getElementById("footer-str").innerHTML = get_string_translation_en("footer_string");
    document.getElementById("modal-error-text").innerHTML = get_string_translation_en("error_txt");
    document.getElementById("modal-success-text").innerHTML = get_string_translation_en("success");
    document.getElementById("modal-projectname-space-text").innerHTML = get_string_translation_en("title_for_new_project");
    document.getElementById("button-project-name").innerHTML = get_string_translation_en("ok");
    document.getElementById("modal-project-description-space-text").innerHTML = get_string_translation_en("info_for_new_project");
}

function setStringsInChosenLanguage(language) {
    if (language == 'en') {
        setStringsEn()
    }
}