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
      .appendField(get_custom_blockly_translations('move_forward'));
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
      .appendField(get_custom_blockly_translations('move_forward_default'));
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
      .appendField(get_custom_blockly_translations('move_forward_distance'))
      .appendField(new Blockly.FieldNumber(0, 0, 1000), "number_of_steps")
      .appendField(get_custom_blockly_translations('cms'))
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
      .appendField(get_custom_blockly_translations('move_reverse'))
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
      .appendField(get_custom_blockly_translations('move_reverse_default'))
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
      .appendField(get_custom_blockly_translations('move_reverse_distance'))
      .appendField(new Blockly.FieldNumber(0, 0, 1000), "number_of_steps")
      .appendField(get_custom_blockly_translations('cms'))
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
      .appendField(get_custom_blockly_translations('stop'))
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
      .appendField(get_custom_blockly_translations('wait'))
      .appendField(new Blockly.FieldNumber(0, null, null), "wait_s")
      .appendField(get_custom_blockly_translations('seconds'))
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
      .appendField(get_custom_blockly_translations('turn_right'))
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
      .appendField(get_custom_blockly_translations('turn_right_90'))
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
      .appendField(get_custom_blockly_translations('turn_left'))
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
      .appendField(get_custom_blockly_translations('turn_left_90'))
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

// BEEP
Blockly.Blocks['beep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(get_custom_blockly_translations('beep'))
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
      .appendField(get_custom_blockly_translations('set'))
      .appendField(new Blockly.FieldDropdown([[get_custom_blockly_translations('red'), "'red'"], [get_custom_blockly_translations('green'), "'green'"], [get_custom_blockly_translations('blue'), "'blue'"], [get_custom_blockly_translations('white'), "'white'"], [get_custom_blockly_translations('violet'), "'violet'"], [get_custom_blockly_translations('cyan'), "'cyan'"], [get_custom_blockly_translations('yellow'), "'yellow'"], [get_custom_blockly_translations('closed'), "'closed'"]]), "color_option")
      .appendField(get_custom_blockly_translations('color'))
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
  console.log('sounds data : ', received_data)
  Blockly.Blocks['play_sound'] = {
    init: function () {
      this.appendDummyInput()
      .appendField(get_custom_blockly_translations('play_sound'))
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
          sound_effects.push([obj.sound_name, '\'' + obj.sound_path + '\''])
        }
        return sound_effects
      } else {
        return new Array(["", "No-option"])
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
    .appendField(get_custom_blockly_translations('distance'))
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['distance'] = function (block) {
  var code = 'robot.get_distance()';
  return [code, Blockly.Python.ORDER_NONE];
}

// LIGHT SENSOR 
Blockly.Blocks['light_sensor'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('light_sensor'))
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['light_sensor'] = function (block) {
  var code = 'robot.get_light_sensor()';
  return [code, Blockly.Python.ORDER_NONE];
}

// NOISE DETECTION 
Blockly.Blocks['noise_detection'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('noise_detection'))
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['noise_detection'] = function (block) {
  var code = 'robot.get_noise_detection()';
  return [code, Blockly.Python.ORDER_NONE];
}

// CHECK FOR OBSTACLE 
Blockly.Blocks['check_for_obstacle'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('check_for_obstacle'))
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['check_for_obstacle'] = function (block) {
  var code = 'robot.check_for_obstacle()';
  return [code, Blockly.Python.ORDER_NONE];
}

// CHECK FOR BORDER LINE 
Blockly.Blocks['check_for_line'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[get_custom_blockly_translations("left_sensor"), "1"], [get_custom_blockly_translations("middle_sensor"), "2"], [get_custom_blockly_translations("right_sensor"), "3"]]), "check_for_line_option")
      .appendField(get_custom_blockly_translations('check_for_line'))
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['check_for_line'] = function (block) {
  var input_value = block.getFieldValue('check_for_line_option');
  var code = 'robot.check_on_line(' + input_value + ')';
  return [code, Blockly.Python.ORDER_NONE];
}

//GET FLOOR SENSOR 
Blockly.Blocks['floor_sensor'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[get_custom_blockly_translations("left_sensor"), "1"], [get_custom_blockly_translations("middle_sensor"), "2"], [get_custom_blockly_translations("right_sensor"), "3"]]), "floor_sensor_option")
      .appendField(get_custom_blockly_translations('floor_sensor'))
      this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['floor_sensor'] = function (block) {
  var input_value = block.getFieldValue('floor_sensor_option');
  var code = 'robot.get_floor_sensor(' + input_value + ')';
  return [code, Blockly.Python.ORDER_NONE];
}

//CHECK FOR DARK
Blockly.Blocks['check_for_dark'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('check_for_dark'))
    this.setOutput(true, 'Boolean');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['check_for_dark'] = function (block) {
  var code = 'robot.check_for_dark()';
  return [code, Blockly.Python.ORDER_NONE];
}

//GET LAST MOVE DISTANCE
Blockly.Blocks['get_last_move_distance'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["αριστερή", "left "], ["δεξιά", "right"]]), "option")
      .appendField(get_custom_blockly_translations('get_last_move_distance'))
      this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['get_last_move_distance'] = function (block) {
  var input_value = block.getFieldValue('option');
  var code = 'robot.get_last_move_distance(' + input_value + ')\n';
  return [code, Blockly.Python.ORDER_NONE];
}

//GET ACCELERATION
Blockly.Blocks['get_acceleration'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('get_acceleration'))
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
  return [code, Blockly.Python.ORDER_NONE];
}

//GET GYROSCOPE
Blockly.Blocks['get_gyroscope'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('get_gyroscope'))
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
  return [code, Blockly.Python.ORDER_NONE];
}

// TEMPERATUR
Blockly.Blocks['temperature'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('temperature'))
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['temperature'] = function (block) {
  var code = 'robot.get_temperature()';
  return [code, Blockly.Python.ORDER_NONE];
}

// HUMIDITY
Blockly.Blocks['humidity'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('humidity'))
    this.setOutput(true, 'Number');
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['humidity'] = function (block) {
  var code = 'robot.get_humidity()';
  return [code, Blockly.Python.ORDER_NONE];
}

//TIME BLOCKS 
Blockly.Blocks['begin_timer'] = {
  init: function () {
    this.appendDummyInput()
    .appendField(get_custom_blockly_translations('begin_timer'))
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
    .appendField(get_custom_blockly_translations('stop_timer'))
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
    .appendField(get_custom_blockly_translations('get_timer'))
    this.setOutput(true, 'Number');
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Python['get_timer'] = function (block) {
  var code = 'robot.get_elapsed()\n';
  return [code, Blockly.Python.ORDER_NONE];
};
