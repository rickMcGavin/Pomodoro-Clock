var minuteDisplay = document.querySelector(".minutes");
var secondsDisplay = document.querySelector(".seconds");
var display = document.querySelector(".display");
var minutes = 0;

function countSeconds() {
  for (var i = 0; i <= 60; i++) {
    let j = i;
    setTimeout(function() {
      console.log(59 - j);
    }, j * 1000);
  }
}

display.addEventListener("click", function() {
  countSeconds();
});
