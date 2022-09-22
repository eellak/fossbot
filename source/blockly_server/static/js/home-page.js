//attributes for adding a new project 
let new_project_title;
let new_project_description;

function loadProjects(data) {
    console.log('load projects');

    //get the array with the projects
    const projects_array = data.data;
    console.log('projects:', projects_array);

    // const rows = document.getElementById("body-table-projects").rows.length;
    // if(rows >0){
    //     for(var i=1; i<=rows; i++) {
    //         document.getElementById("body-table-projects").deleteRow(i);
    //     }
    //     location.reload();
    // }
    
    for (var i = 0; i < projects_array.length; i++) {
        const project = projects_array[i];

        //add every time the the project name as the last row
        document.getElementById("body-table-projects").insertRow(-1).innerHTML =
            '<tr>' +
            '<td>' + project['title'] +'</td>'+
            '<td>' + project['info'] +'</td>'+
            '<td>' + project['project_id'] + '</td>' +
            '<td> <div id="run-Blockly-Button-container" class="run-Blockly-Button-container">' +
                        '<div id="run-Blockly-Button-wrap" class="run-Blockly-Button-wrap">' +
                            '<button onclick="execute_script('+ project['project_id'] +')" type="button" class="run-Blockly" id="open-Blockly">' +
                                'Εκτέλεση' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
            '</td>' +
            '<td> <div id="open-Blockly-Button-container" class="open-Blockly-Button-container">' +
                '<div id="open-Blockly-Button-wrap" class="open-Blockly-Button-wrap">' +
                    '<button type="button" class="open-Blockly" id="open-Blockly">' +
                        '<a href="/blockly?id='+ project['project_id'] +'" id="open-Blockly-href" style="color: white; text-decoration: none;">Επεξεργασία</a>' +
                    '</button>' +
                '</div>' +
            '</div>' +
            '</td>' +
            '<td>   <div id="delete-Blockly-Button-container" class="delete-Blockly-Button-container">' +
                        '<div id="delete-Blockly-Button-wrap" class="delete-Blockly-Button-wrap">' +
                            '<button onclick="deleteElement(this,'+ project['project_id'] +')" type="button" class="delete-Blockly" id="open-Blockly">' +
                                '<a id="open-Blockly-href" style="color: white; text-decoration: none;">Διαγραφή</a>' +
                            '</button>' +
                        '</div>' +
                    '</div>' +
            '</td>' +
            '</tr>';
    }

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

        const result = await newProject(new_project_title,new_project_description)
        console.log('result is ', result)
        window.location.replace('/blockly?id='+ result.project_id)
    }
}

async function deleteElement(el,id) {
    var tbl = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;    
    var row = el.parentNode.parentNode.parentNode.parentNode.rowIndex;    

    const result = await deleteProject(id)
    console.log('result is ', result)
    if(result.status == '200') {
        tbl.deleteRow(row);
        location.reload();
    }
}

async function execute_script(project_id) {
    const result = await executeScript(project_id)
    console.log('execute script result is ', result)
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
    array =  array.split(" ", 2)
    if (array[0] && array[1]) {
        document.getElementById("robot-name").innerHTML = array[0] + " " + array[1]
    } else {
        document.getElementById("robot-name").innerHTML = window.location.hostname
    }
}