function stop_script() {
    stopScript();
}

function send_command_for_manual_control(command) {
  sendManualControlCommand(command)
}


function setStringsEn() {
  document.getElementById("open-home-href").innerHTML = get_string_translation_en("go_back_to_home_page");
  document.getElementById("panel-title-wrap").innerHTML = get_string_translation_en("manual_use");
  document.getElementById("button-up").innerHTML = get_string_translation_en("button_up");
  document.getElementById("button-down").innerHTML = get_string_translation_en("button_down");
  document.getElementById("button-left").innerHTML = get_string_translation_en("button_left");
  document.getElementById("button-right").innerHTML = get_string_translation_en("button_right");
}

function setStringsInChosenLanguage(language) {
  console.log('lang: ', language)
  if(language=='el') {
    setStringsEn()
  }
}