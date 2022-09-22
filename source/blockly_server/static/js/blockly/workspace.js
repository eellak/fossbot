const toolbox = document.getElementById('toolbox');

let options = {
  toolbox: toolbox,
  collapse: true,
  comments: true,
  disable: true,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: true,
  sounds: true,
  oneBasedIndex: true
};

let demoWorkspace = Blockly.inject('blocklyDiv', options);

/* Load Custom Workspace Blocks from XML to workspace. */
//MOVE FORWARD 
Blockly.Blocks['move_forward'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Προχώρα μπροστά");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['move_forward'] = function (block) {
  var code = 'robot.move_forward()\n';
  return code;
};

// MOVE FORWARD DEFAULT 
Blockly.Blocks['move_forward_default'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Προχώρα μπροστά ένα βήμα");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['move_forward_default'] = function (block) {
  var code = 'robot.move_forward_default()\n';
  return code;
};

//MOVE FORWARD DISTANCE
Blockly.Blocks['move_forward_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Προχώρα μπροστά")
      .appendField(new Blockly.FieldNumber(0, 0, 1000), "number_of_steps")
      .appendField("εκατοστά");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['move_forward_distance'] = function (block) {
  var input_value = block.getFieldValue('number_of_steps');
  var code = 'robot.move_forward_distance(' + input_value + ')\n';
  return code;
}

// MOVE REVERSE 
Blockly.Blocks['move_reverse'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Προχώρα προς τα πίσω");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['move_reverse'] = function (block) {
  var code = 'robot.move_reverse()\n';
  return code;
};

// MOVE REVERSE DEFAULT
Blockly.Blocks['move_reverse_default'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Προχώρα προς τα πίσω ένα βήμα");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['move_reverse_default'] = function (block) {
  var code = 'robot.move_reverse_default()\n';
  return code;
};

// MOVE REVERSE DISTANCE
Blockly.Blocks['move_reverse_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Προχώρα προς τα πίσω")
      .appendField(new Blockly.FieldNumber(0, 0, 1000), "number_of_steps")
      .appendField("εκατοστά");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['move_reverse_distance'] = function (block) {
  var input_value = block.getFieldValue('number_of_steps');
  var code = 'robot.move_reverse_distance(' + input_value + ')\n';
  return code;
}

// STOP
Blockly.Blocks['stop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Σταμάτα");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['stop'] = function (block) {
  var code = 'robot.stop()\n';
  return code;
};

//  WAIT 
Blockly.Blocks['wait'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Περίμενε")
      .appendField(new Blockly.FieldNumber(0,null ,null), "wait_s")
      .appendField("δευτερόλεπτα");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['wait'] = function (block) {
  var input_value = block.getFieldValue('wait_s');
  return 'robot.wait(' + input_value + ')\n';
}

// TURN RIGHT / CLOCKWISE 
Blockly.Blocks['turn_right'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Στρίψε δεξιά");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['turn_right'] = function (block) {
  var code = 'robot.rotate_clockwise()\n';
  return code;
};

Blockly.Blocks['turn_right_90'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Στρίψε δεξιά 90 μοίρες");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['turn_right_90'] = function (block) {
  var code = 'robot.rotate_clockwise_90()\n';
  return code;
};

// TURN LEFT / COUNTERCLOCKWISE 
Blockly.Blocks['turn_left'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Στρίψε αριστερά");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['turn_left'] = function (block) {
  var code = 'robot.rotate_counterclockwise()\n';
  return code;
};

// TURN LEFT STEP / COUNTERCLOCKWISE STEP
Blockly.Blocks['turn_left_90'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Στρίψε αριστερά 90 μοίρες");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['turn_left_90'] = function (block) {
  var code = 'robot.rotate_counterclockwise_90()\n';
  return code;
};

// ROTATE DEGREES ANGLE 
// Blockly.Blocks['rotate_degrees_angle'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("Στρίψε")
//       .appendField(new Blockly.FieldNumber(0, -360, 360), "angle")
//       .appendField("μοίρες");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(290);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };


// Blockly.Python['rotate_degrees_angle'] = function (block) {
//   var input_value = block.getFieldValue('angle');
//   var code = 'robot.rotate_degrees(' + input_value + ')\n';
//   return code;
// }

//ROTATE DEFAULT 
// Blockly.Blocks['rotate_default'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("Στρίψε default μοίρες")
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(290);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };


// Blockly.Python['rotate_default'] = function (block) {
//   var code = 'robot.rotate_default()\n';
//   return code;
// }

// BEEP
Blockly.Blocks['beep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Beep");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['beep'] = function (block) {
  var code = 'robot.beep()\n';
  return code;
}

//SET COLOR 
Blockly.Blocks['set_color'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Διάλεξε")
      .appendField(new Blockly.FieldDropdown([["κόκκινο", "'red'"], ["πράσινο", "'green'"], ["μπλε", "'blue'"], ["άσπρο", "'white'"], ["βιολετί", "'violet'"], ["κυανό", "'cyan'"], ["κίτρινο", "'yellow'"], ["κλειστό", "'closed'"]]), "color_option")
      .appendField("χρώμα");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['set_color'] = function (block) {
  var input_value = block.getFieldValue('color_option');
  return 'robot.rgb_set_color(' + input_value + ')\n';
}

//PLAY SOUND
var socket = io('http://' + document.domain + ':' + location.port);

socket.on("connect", function () {
  socket.emit('connection', { 'data': 'I\'m connected!' });
});

socket.emit('get_sound_effects');
let received_data;
socket.on('sound_effects', (data) => {
  received_data = data;
  Blockly.Blocks['play_sound'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("παίξε τον ήχο")
        .appendField(new Blockly.FieldDropdown(this.generateOptions), "option");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip("");
      this.setHelpUrl("");
    },
    generateOptions: function () {
      let sound_effects = new Array()
      if (received_data.status == 200) {
        const soundsArray = received_data.data
        for (let i = 0; i < soundsArray.length; i++) {
          let obj = soundsArray[i]
          sound_effects.push([obj.sound_name, '\''+ obj.sound_path + '\''])
        }
        return sound_effects
      } else {
        return new Array(["","No-option"])
      }
    }
  };
});

Blockly.Python['play_sound'] = function (block) {
  var input_value = block.getFieldValue('option');
  var code = 'robot.play_sound(' + input_value + ')\n';
  return code;
}

//sensors 

// DISTANCE
Blockly.Blocks['distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("απόσταση από εμπόδιο");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['distance'] = function (block) {
  var code = 'robot.get_distance()';
  return [code,Blockly.Python.ORDER_NONE];
}

 // LIGHT SENSOR 
Blockly.Blocks['light_sensor'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("σένσορας φωτός");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['light_sensor'] = function (block) {
  var code = 'robot.get_light_sensor()';
  return [code,Blockly.Python.ORDER_NONE];
}

// NOISE DETECTION 
Blockly.Blocks['noise_detection'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("θόρυβος");
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['noise_detection'] = function (block) {
  var code = 'robot.get_noise_detection()';
  return [code,Blockly.Python.ORDER_NONE];
}

// CHECK FOR OBSTACLE 
Blockly.Blocks['check_for_obstacle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("ύπαρξη εμποδίου");
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['check_for_obstacle'] = function (block) {
  var code = 'robot.check_for_obstacle()';
  return [code,Blockly.Python.ORDER_NONE];
}

// CHECK FOR BORDER LINE 
Blockly.Blocks['check_for_line'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["αριστερός", "1"], ["μεσαίος", "2"], ["δεξιός", "3"]]), "check_for_line_option")
      .appendField("ύπαρξη μαύρης γραμμής");
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['check_for_line'] = function (block) {
  var input_value = block.getFieldValue('check_for_line_option');
  var code = 'robot.check_on_line(' + input_value + ')';
  return [code,Blockly.Python.ORDER_NONE];
}

//GET FLOOR SENSOR 
Blockly.Blocks['floor_sensor'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["αριστερός", "3"], ["μεσαίος", "1"], ["δεξιός", "2"]]), "floor_sensor_option")
      .appendField("αισθητήρας εδάφους");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['floor_sensor'] = function (block) {
  var input_value = block.getFieldValue('floor_sensor_option');
  var code = 'robot.get_floor_sensor(' + input_value + ')';
  return [code,Blockly.Python.ORDER_NONE];
}

//CHECK FOR DARK
Blockly.Blocks['check_for_dark'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("είναι σκοτεινά");
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['check_for_dark'] = function (block) {
  var code = 'robot.check_for_dark()';
  return [code,Blockly.Python.ORDER_NONE];
}

// //CHECK ON LINE 
// Blockly.Blocks['check_on_line'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField(new Blockly.FieldDropdown([["αριστερή", "left "], ["μεσαία", "center"], ["δεξιά", "right"]]), "option")
//       .appendField("γραμμή");
//     this.setOutput(true, 'Boolean');
//     this.setColour(45);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };

// Blockly.Python['check_on_line'] = function (block) {
//   var input_value = block.getFieldValue('option');
//   var code = 'robot.check_on_line(' + input_value + ')';
//   return [code,Blockly.Python.ORDER_NONE];
// }


//GET LAST MOVE DISTANCE
Blockly.Blocks['get_last_move_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["αριστερή", "left "], ["δεξιά", "right"]]), "option")
      .appendField("απόσταση τελευταίας κίνησης");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['get_last_move_distance'] = function (block) {
  var input_value = block.getFieldValue('option');
  var code = 'robot.get_last_move_distance(' + input_value + ')\n';
  return [code,Blockly.Python.ORDER_NONE];
}

//GET ACCELERATION
Blockly.Blocks['get_acceleration'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("επιτάχυνση στον άξονα")
      .appendField(new Blockly.FieldDropdown([["χ", "x"], ["ψ", "y"], ["ζ", "z"]]), "option");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['get_acceleration'] = function (block) {
  var input_value = block.getFieldValue('option');
  var code = 'robot.get_acceleration("' + input_value + '")';
  return  [code,Blockly.Python.ORDER_NONE];
}

//GET GYROSCOPE
Blockly.Blocks['get_gyroscope'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("τιμή γυροσκοπίου στον άξονα")
      .appendField(new Blockly.FieldDropdown([["χ", "x"], ["ψ", "y"], ["ζ", "z"]]), "option");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['get_gyroscope'] = function (block) {
  var input_value = block.getFieldValue('option');
  var code = 'robot.get_gyroscope("' + input_value + '")';
  return [code,Blockly.Python.ORDER_NONE];
}

// TEMPERATUR
Blockly.Blocks['temperature'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("θερμοκρασία");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['temperature'] = function (block) {
  var code = 'robot.get_temperature()';
  return [code,Blockly.Python.ORDER_NONE];
}

// HUMIDITY
Blockly.Blocks['humidity'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("υγρασία");
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['humidity'] = function (block) {
  var code = 'robot.get_humidity()';
  return [code,Blockly.Python.ORDER_NONE];
}

// BATTERY
// Blockly.Blocks['battery'] = {
//   init: function () {
//     this.appendDummyInput()
//       .appendField("μπαταρία");
//     this.setOutput(true, 'Number');
//     this.setColour(45);
//     this.setTooltip("");
//     this.setHelpUrl("");
//   }
// };

// Blockly.Python['battery'] = function (block) {
//   var code = 'robot.get_battery()';
//   return [code,Blockly.Python.ORDER_NONE];
// }

//TIME BLOCKS 
Blockly.Blocks['begin_timer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Έναρξη μέτρησης χρόνου");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Python['begin_timer'] = function (block) {
  var code = 'robot.start_timer()\n';
  return code;
};


Blockly.Blocks['stop_timer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Σταμάτημα μέτρησης χρόνου");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['stop_timer'] = function (block) {
  var code = 'robot.stop_timer()\n';
  return code;
};

Blockly.Blocks['get_timer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Χρόνος που πέρασε");
    this.setOutput(true, 'Number');
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['get_timer'] = function (block) {
  var code = 'robot.get_elapsed()\n';
  return [code,Blockly.Python.ORDER_NONE];
};
