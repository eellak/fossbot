//attributes for adding a new project 
let new_project_title;
let new_project_description;
let new_project_folder;

//the arrays contain the values getting from BE 
let array_folders = [];
let array_projects = [];
let array_ids = [];

let scripts = [];

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

function showNewProject() {
    console.log("scripts");
    console.log(scripts);
    const proj_obj = new Object();
    proj_obj.id = scripts.length;
    proj_obj.folder = new_project_folder;
    proj_obj.title = new_project_title;

    //convert object to json string
    var proj_string = JSON.stringify(proj_obj);
    console.log(proj_string);

    scripts.push(proj_obj);
    console.log(scripts);

    // delete the old rows and show the table again with the new data added 
    var table = document.getElementById("body-table-projects");
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        table.deleteRow(i);
    }

    showFoldersAndProjects(scripts);
}


function deleteElement(el,id) {
    var tbl = el.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;    
    var row = el.parentNode.parentNode.parentNode.parentNode.rowIndex;    
    //alert('Το πρότζεκτ θα διαγραφεί!')
    deleteProject(id).then(response => { 
        tbl.deleteRow(row);
        location.reload();
   })
    
    // let text = "Είστε σίγουρος;\nEither OK or Cancel.";
    // if (confirm(text) == true) {
    //     deleteProject(id);
    //     tbl.deleteRow(row);
    // } 
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
