function stop_script() {
    stopScript();
}

function send_command_for_manual_control(command) {
  sendManualControlCommand(command)
}


function setStrings() {
  document.getElementById("open-home-href").value = get_string_translation("go_back_to_home_page");
  document.getElementById("panel-title-wrap").value = get_string_translation("manual_use");
  document.getElementById("button-up").value = get_string_translation("button_up");
  document.getElementById("button-down").value = get_string_translation("button_down");
  document.getElementById("button-left").value = get_string_translation("button_left");
  document.getElementById("button-right").value = get_string_translation("button_right");
}