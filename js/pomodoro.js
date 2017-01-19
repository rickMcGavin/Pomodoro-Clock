var minuteDisplay = document.querySelector(".minutes");
var secondsDisplay = document.querySelector(".seconds");
var pomodoroMinutes = document.querySelector(".pomodoro-minutes");
var breakMinutes = document.querySelector(".break-minutes");

function updateDisplay(minutes, j) {
  minuteDisplay.textContent = Math.floor((minutes - j) / 60).toString();
  if (((minutes - j) % 60) >= 0 && ((minutes - j) % 60) <= 9) {
    secondsDisplay.textContent = "0" + ((minutes - j) % 60).toString();
  } else {
    secondsDisplay.textContent = ((minutes - j) % 60).toString();
  }
}

function timer(minutes) {
  for (var i = minutes; i > 0; i--) {
    let j = i;
    setTimeout(function() {
      updateDisplay(minutes, j);
    }, j * 1000);
  }
}

document.querySelector(".play").addEventListener("click", function() {
  var minutes = Number(pomodoroMinutes.value);
  timer(minutes * 60);
  document.querySelector(".play").classList.add("hide");
  document.querySelector(".pause").classList.remove("hide");
});

document.querySelector(".pause").addEventListener("click", function() {
  clearTimeout();
  document.querySelector(".pause").classList.add("hide");
  document.querySelector(".play").classList.remove("hide");
});

document.querySelector(".pomodoro-minus").addEventListener("click", function() {
  pomodoroMinutes.value--;
});

document.querySelector(".pomodoro-plus").addEventListener("click", function() {
  pomodoroMinutes.value++;
});

document.querySelector(".break-minus").addEventListener("click", function() {
  breakMinutes.value--;
});

document.querySelector(".break-plus").addEventListener("click", function() {
  breakMinutes.value++;
});
