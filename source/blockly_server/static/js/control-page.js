function stop_script() {
    stopScript();
}

function send_command_for_manual_control(command) {
  sendManualControlCommand(command)
}


function setStrings() {
  document.getElementById("open-home-href").value = get_string_translation("go_back_to_home_page");
}