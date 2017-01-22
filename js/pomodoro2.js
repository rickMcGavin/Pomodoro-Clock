

var Pomodoro = function(pomodoroTime, breakTime, displayElementId) {
  this.session = pomodoroTime * 60;
  this.break = breakTime * 60;
  this.state = 0;
  this.lastState = 2;
  this.timeLeft = pomodoroTime * 60;
  this.timerDisplay = displayElementId;
};

Pomodoro.prototype.begin = function() {
  var self = this;
  if (this.state === 0 || this.state === 1) {
    this.newState(this.lastState === 2 ? 2: 3);
    tick();
    this.timer = setInterval(function() {
      tick();
    }, 1000);
  }

  function tick() {
    self.timeLeft = self.timeLeft - 1;
    self.updateDisplay(self.timeLeft);
    if (self.timeLeft === 0) {
      self.timeLeft = self.state === 2 ? self.break : self.session;
      self.newState(self.state === 2 ? 3 : 2);
    }
  }
};

Pomodoro.prototype.pause = function() {
  if (this.state === 2 || this.state === 3) {
    this.newState(1);
    clearInterval(this.timer);
  }
};

Pomodoro.prototype.reset = function() {
  this.newState(0);
  this.timeLeft = this.session;
  clearInterval(this.timer);
  this.updateDisplay(this.timeLeft);
};

Pomodoro.prototype.updateDisplay = function(time) {
  document.getElementById(this.timerDisplay).textContent = getFormattedTime(time);

  function getFormattedTime(seconds) {
    var minsLeft = Math.floor(seconds / 60);
    var secondsLeft = seconds - (minsLeft * 60);

    return minsLeft + ":" + zeroPad(secondsLeft);

    function zeroPad(number) {
      return number < 10 ? "0" + number : number;
    }

  }
};

Pomodoro.prototype.updateTimes = function(cycleTime, breakTime) {
  this.session = cycleTime * 60;
  this.break = breakTime * 60;
  this.reset();
};

Pomodoro.prototype.newState = function(state) {
  this.lastState = this.state;
  this.state = state;
  var audioFile;

  if (state === 0) {
    this.lastState = 2;
  }
  if (state === 1) {
    audioFile = "audio/chafing.mp3";
  }
  if (state === 2) {
    audioFile = "";
  }
  if (state === 3) {
    audioFile = "audio/the-calling.mp3";
  }

  if (state === 1 || state === 2 || state === 3) {
    var audio = new Audio(audioFile);
    audio.play();
  }

  this.updateDisplay(this.timeLeft);
};

var playButton = document.querySelector(".play");
var pauseButton = document.querySelector(".pause");
var resetButton = document.querySelector(".reset");
var pomo = new Pomodoro(25, 5, "clock");

function hideRemove() {
  playButton.classList.remove("hide");
  pauseButton.classList.remove("hide");
}

playButton.addEventListener("click", function() {
  pomo.begin();
  hideRemove();
  playButton.classList.add("hide");
});

pauseButton.addEventListener("click", function() {
  pomo.pause();
  hideRemove();
  pauseButton.classList.add("hide");
});

resetButton.addEventListener("click", function() {
  pomo.reset();
});
