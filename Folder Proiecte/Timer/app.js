const startingMinutes = 600;
let time = startingMinutes;
let intervalId;

const timerEl = document.getElementById("timer")
const resetBtn = document.getElementById("resetBtn")
const stopBtn = document.querySelector("#stopBtn")

intervalId = setInterval(updateCount, 1000)

function updateCount(){
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerEl.innerHTML = `${minutes}:${seconds}`;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    time--;
    if(time < 0){
        clearInterval(intervalId);
    }
}

resetBtn.addEventListener("click",()=>{
    clearInterval(intervalId);
    time = startingMinutes;
    updateCount();
    intervalId = setInterval(updateCount, 1000);
})

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
});