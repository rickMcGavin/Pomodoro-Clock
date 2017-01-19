var minuteDisplay = document.querySelector(".minutes");
var secondsDisplay = document.querySelector(".seconds");
var display = document.querySelector(".display");
var pomodoroMinutes = document.querySelector(".pomodoro-minutes");
var breakMinutes = document.querySelector(".break-minutes");

function countSeconds() {
  for (var i = 0; i < 60; i++) {
    let j = i;
    setTimeout(function() {
      if (j >= 50 && j <= 59) {
        secondsDisplay.textContent = "0" + (59-j).toString();
      } else {
        secondsDisplay.textContent = (59 - j).toString();
      }

    }, j * 1000);
  }
}

function countMinutes(minutes) {
  setTimeout(function() {
    minuteDisplay.textContent = (minutes - 1).toString();
  }, 60 * 1000);
  countSeconds();
}

display.addEventListener("click", function() {
  var minutes = Number(pomodoroMinutes.value);
  for (var i = minutes; i > 0; i--) {
    countSeconds();
    countMinutes(minutes);
  }
});

// console.log(minutes);
