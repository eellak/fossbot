class Timer {
    constructor(time) {
        this.start_time = time; //unix timestamp
    }

    get getCurrentTime() {
        //returns time in sec
        var time_now = Date.now();
        var diff = this.start_time - time_now;
        return Math.floor(diff/1000);
    }

    stopTime(){
        //stop counting time 
        this.start_time = " "; 
    }

    resetTime(){
        //start again counting time  
        var time_now = Date.now();
        this.start_time = time_now; 
    }
}