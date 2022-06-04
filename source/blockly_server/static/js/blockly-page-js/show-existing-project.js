function loadProject() { 
  const url_str = window.location.href;
  console.log(url_str)

  var url = new URL(url_str);
  var id = url.searchParams.get("id");
  console.log("project is id", id);

  if ( id ) {
    //only if the project is saved, it will have an id , so we can retrieve the xml code 

    //get project code from BE based on id 
    getXmlCode(id)
      .then( response => {
        console.log("response ", response.data)
        loadXml(response.data.data);
      })
      .catch(err => {
          console.log('Error when getting project\n', err);
          showModalErrorInBlocklyPage("Υπήρξε σφάλμα στην διαδικασία να φορτώσει ο κώδικας! Παρακαλώ ξαναπροσπάθησε!");
      });
  } 

}

  