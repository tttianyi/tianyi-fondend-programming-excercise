"use strict";

/*---------------------time update function-------------------*/
function timeUpdate(){
    //get the present time
    var  nowTime =  new  Date();
    var timeForm = document.getElementById("time-form").value;
    console.log(timeForm);
    
    //check the form value
    if (timeForm == "12h"){
        nowTime = dateFormat("mediumTime");//get the correct format
        console.log(nowTime);
    }
    else if (timeForm == "24h"){
        nowTime = dateFormat("isoTime");//get the correct format
        console.log(nowTime);
    }
    
    //update time
    var time = document.getElementById("time");
    console.log(time);
    time.innerHTML = nowTime;//write the now time
}

/*---------------------date update function-------------------*/
function dateUpdate(){
    //get the present date
    var dateTime =  new  Date();
    var dateForm = document.getElementById("date-form").value;
    console.log(dateForm);

    //check the form value
    if (dateForm == "Long form"){
       dateTime = dateTime.format("dddd, mmmm dS, yyyy");//get the correct format
       console.log(dateTime);
    }
    else if (dateForm == "Short form"){
        dateTime = dateTime.format("dd/mm/yyyy");//get the correct format
        console.log(dateTime);
    }

    //update date
    var date = document.getElementById("date");
    console.log(date);
    date.innerHTML = dateTime;//write the date
}


/*---------------------main program-------------------*/
//make sure time and date can appear together
setTimeout(timeUpdate, 10);
setTimeout(dateUpdate, 10);

//refresh the clock by 1000ms
setInterval(timeUpdate, 1000);
setInterval(dateUpdate, 1000);