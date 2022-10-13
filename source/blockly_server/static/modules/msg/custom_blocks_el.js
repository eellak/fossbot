function get_custom_blockly_translations(key){
    const translation = translations_el[key]
    return translation
}

const translations_el = {
    "move_forward": "Προχώρησε μπροστά",
    "move_forward_default": "Προχώρησε μπροστά ένα βήμα",
    "move_forward_distance": "Προχώρησε μπροστά για",
    "move_reverse": "Προχώρησε προς τα πίσω",
    "move_reverse_default": "Προχώρησε προς τα πίσω ένα βήμα",
    "move_reverse_distance": "Προχώρησε προς τα πίσω για",
    "stop": "Σταμάτησε",
    "wait": "Περίμενε",
    "seconds": "δευτερόλεπτα",
    "turn_right": "Στρίψε δεξιά",
    "turn_right_90": "Στρίψε δεξιά 90 μοίρες",
    "turn_left": "Στρίψε αριστερά",
    "turn_left_90": "Στρίψε αριστερά 90 μοίρες",
    "beep": "Μπιπ",
    "set": "Διάλεξε",
    "color": "χρώμα",
    "play_sound": "Παίξε τον ήχο",
    "distance": "Απόσταση από εμπόδιο",
    "light_sensor": "Αισθητήρας φωτός",
    "noise_detection": "Θόρυβος",
    "check_for_obstacle": "Ύπαρξη εμποδίου",
    "check_for_line": "Ύπαρξη μαύρης γραμμής",
    "floor_sensor": "Αισθητήρας εδάφους",
    "check_for_dark": "Είναι σκοτεινά",
    "get_last_move_distance": "Απόσταση τελευταίας κίνησης",
    "get_acceleration": "Επιτάχυνση στον άξονα",
    "get_gyroscope": "Τιμή γυροσκοπίου στον άξονα",
    "temperature": "Θερμοκρασία",
    "humidity": "Yγρασία",
    "begin_timer": "Έναρξη μέτρησης χρόνου",
    "stop_timer": "Σταμάτημα μέτρησης χρόνου",
    "get_timer": "Χρόνος που πέρασε"
}