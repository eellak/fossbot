//attributes for adding a new project 
let new_project_title;
let new_project_description;
let new_project_folder;

function loadProjects(data) {
    console.log('load projects');

    //get the array with the projects
    const projects_array = data.data;
    console.log('projects:', projects_array);

    for (var i = 0; i < projects_array.length; i++) {
        const project = projects_array[i];

        //add every time the folder and the project name as the last row
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


function getDescription() {
    //get the input value 
    new_project_description = document.getElementById("project-description-text").value

    if (new_project_description != '') {
        //close the modal 
        closeModalNewProjectDescription();

        //empty the input value 
        document.getElementById("project-description-text").value = " ";

        newProject(new_project_title,new_project_description)
        .then(response => { 
             window.location.replace('/blockly?id='+response.data.project_id)
        })
    
    }
}



function deleteElement(el,id) {
    var tbl = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;    
    var row = el.parentNode.parentNode.parentNode.parentNode.rowIndex;    

    deleteProject(id).then(response => { 
    	tbl.deleteRow(row);
    	location.reload();
    });
}


function saveProjectsAndFolders(array) {
    console.log("projects & folders");
    console.log(array);
    for (let i = 0; i < length; i++) {
        array_folders.push(array[i].folder);
        array_projects.push(array[i].title);
        array_ids.push(arrayarray[i].id);
    }
}

function showFoldersAndProjects(data_array) {
    const open_blockly_text = "Άνοιξε το πρότζεκτ στο Blockly";
    for (var i = 0; i < data_array.length; i++) {
        const folder_project = data_array[i];

        //add every time the folder and the project name as the last row
        document.getElementById("body-table-projects").insertRow(-1).innerHTML =
            '<tr role=\"row\">' +
            '<th class=\"project-folder\">' + folder_project.folder + '</th>' +
            '<th class=\"project-title\">' + folder_project.title + '</th>' +
            '<th class=\"project-button\">' +
            '<button type=\"button\" class=\"open-Blockly project\" id=\"open-Blockly-button\">' +
            open_blockly_text +
            '</button>' +
            '</th>'
            + '</tr>';
    }
}


function execute_script(project_id) {
    executeScript(project_id)
        .then( response => {
            let status = response.data.status 
            
            if ( status == "file not found") {
                showModalErrorInHome("Δεν βρέθηκε εκτελέσιμος κώδικας!")
            } else if ( status == "started") { 
                showModalsSuccessInHome("Η εκτέλεση έχει ξεκινήσει!") 
            } else {
                showModalsSuccessInHome("Το πρόγραμμα εκτελείται ήδη!") 
            }
        })
}

function stop_script() {
    stopScript();
}
