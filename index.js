
const time = document.getElementById('time');
const day = document.getElementById('day');

let alarmsArray = [];

const days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
}


const saveAlarm = () => {
    // console.log(time.value, day.value);

    if(time.value == '') alert("Please select time.");
    else{
        let div = document.createElement("div");
        div.style.display = 'flex';
        div.style.justifyContent = 'space-between';
        div.style.alignItems = 'center';
        div.style.backgroundColor = "gray";
        div.style.padding = "10px 20px";
        div.style.borderRadius = "5px"

        let innerDiv = document.createElement("div");
        innerDiv.style.display = 'flex';
        innerDiv.style.justifyContent = 'space-between';
        innerDiv.style.alignItems = 'center';
        innerDiv.style.width = '70%';

        let timeSpan = document.createElement('span');
        timeSpan.innerHTML = `${time.value}`;
        timeSpan.style.fontSize = "20px";

        let daySpan = document.createElement('span');
        daySpan.style.fontSize = "20px";
        daySpan.innerHTML = `${day.value}`;

        let btn = document.createElement('button');
        btn.innerText = 'Delete';
        btn.setAttribute("class", "deleteBtn")
        btn.addEventListener('click', function() {
            deleteAlarm(div);
        });

        let dayNumber;

        for(let key in days){
            if(days[key] === day.value) dayNumber = key;
        }

        let alarmObject = {
            time: time.value,
            day: dayNumber
        }

        alarmsArray.push(alarmObject);

        innerDiv.append(daySpan, btn);

        div.append(timeSpan, innerDiv);
        document.getElementById('alarms').appendChild(div);

        console.log(alarmsArray);

        document.getElementById('setAlarm').style.display = "none";
    }
}

const deleteAlarm = (div) => {
    div.parentNode.removeChild(div);
}

const addAlarm = () => {
    document.getElementById('setAlarm').style.display = "block";
    time.value = "";
    day.value = 'Sunday';
}

document.getElementById("addAlarm").addEventListener("click", addAlarm);
document.getElementById("saveAlarm").addEventListener("click", saveAlarm);

let count = 0;
// const newTime = new Date();
// let minutes = currentTime.getMinutes();
let sMinutes;
let modal = document.getElementById("myModal");
let stop = document.getElementById("stop");
let snooze = document.getElementById("snooze");

setInterval(()=>{
    const currentTime = new Date();
    document.getElementById('clock').innerHTML = currentTime.toLocaleTimeString();
    let hour = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    let currentDay = currentTime.getDay();

    if(hour.toString().length < 2) hour = `0${hour.toString()}`;
    if(minutes.toString().length < 2) minutes = `0${minutes.toString()}`;
    for(let i=0; i<alarmsArray.length; i++){
        if( alarmsArray[i].time == `${hour}:${minutes}` && seconds == '00' && alarmsArray[i].day == currentDay){
            modal.style.display = "block";
            
            stop.onclick = () => {
                modal.style.display = "none";
                count = 0;
            }
            
            snooze.onclick = () => {
                modal.style.display = "none";
                sMinutes = minutes + 1;
                count++;
                console.log(count);
            }
        }

        console.log(sMinutes);

        if(minutes >= 55 || minutes == 0) sMinutes = (minutes + 5) - 60;

        if(count > 0 && count <=3){

            if(minutes == sMinutes && seconds == '00'){
                modal.style.display = "block";
                if(count == 2) {snooze.style.display = 'none';}
            }
        }
    }
    // console.log(hour.toString().length);
    // console.log(`${hour}:${minutes}`);
    // console.log(alarmsArray[0].time);
}, 1000);