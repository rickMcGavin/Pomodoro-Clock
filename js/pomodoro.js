

    var Pomodoro = function(displayId, sessionMinutes, breakMinutes) {
    this.displayId = displayId;
    this.sessionMinutes =  sessionMinutes * 60;
    this.breakMinutes = breakMinutes * 60;
    this.state = 0;
    this.lastState = 2;
    this.timeLeft = sessionMinutes * 60;
  };

  Pomodoro.prototype.updateState = function(state) {
	this.lastState = this.state;
	this.state = state;
	var audioFile;
	switch (state) {
		case 0:
      this.lastState = 2;
			break;
		case 1:
      audioFile = "audio/chafing.mp3";
			break;
		case 2:
      audioFile = "audio/just-like-magic.mp3";
			break;
		case 3:
      audioFile = "audio/the-calling.mp3";
	}
    if (state === 1 || state === 2 || state === 3) {
        var audio = new Audio(audioFile);
        audio.play();
    }
	this.updateDisplay(this.timeLeft);
};

  Pomodoro.prototype.updateDisplay = function(minutes) {
    if (minutes % 60 < 10) {
      document.getElementById(this.displayId).textContent = Math.floor(minutes / 60).toString() + ":" + "0" + (minutes % 60).toString();
    } else {
      document.getElementById(this.displayId).textContent = Math.floor(minutes / 60).toString() + ":" + (minutes % 60).toString();
    }
  };

  Pomodoro.prototype.begin = function() {
    var self = this;
    if (this.state === 0 || this.state === 1) {
      this.updateState(this.lastState === 2 ? 2 : 3);
      countDown();
      this.timer = setInterval(function() {
        countDown();
      }, 1000);
    }



    function countDown() {
      self.timeLeft--;
      self.updateDisplay(self.timeLeft);
      if (self.timeLeft === 0) {
        self.timeLeft = self.state === 2 ? self.breakMinutes : self.sessionMinutes;
        self.updateState(self.state === 2 ? 3: 2);
      }
    }
  };

  Pomodoro.prototype.pause = function() {
    if (this.state === 2 || this.state === 3) {
      this.updateState(1);
      clearInterval(this.timer);
    }
  };

  Pomodoro.prototype.reset = function() {
    this.updateState(0);
    this.timeLeft = this.sessionMinutes;
    clearInterval(this.timer);
    this.updateDisplay(this.timeLeft);
  };

  Pomodoro.prototype.updatePomoTime = function(sessionTime) {
    this.sessionMinutes = sessionTime;
    this.reset();
  };

  Pomodoro.prototype.updateBreakTime = function(breakTime) {
    this.breakMinutes = breakTime;
    this.reset();
  };

  var playButton = document.querySelector(".play");
  var pauseButton = document.querySelector(".pause");
  var resetButton = document.querySelector(".reset");

  var pomo = new Pomodoro("clock", 25, 5);

  function removeHide() {
    playButton.classList.remove("hide");
    pauseButton.classList.remove("hide");
  }

  playButton.addEventListener("click", function() {
    pomo.begin();
    removeHide();
    playButton.classList.add("hide");
  });

  pauseButton.addEventListener("click", function() {
    pomo.pause();
    removeHide();
    pauseButton.classList.add("hide");
  });

  resetButton.addEventListener("click", function() {
    pomo.reset();
    removeHide();
    pauseButton.classList.add("hide");
  });


  document.getElementById("pomodoro-minus").addEventListener("click", function() {

    if (((pomo.sessionMinutes / 60) - 1) <= 1) {
      document.querySelector(".pomodoro-minutes").textContent = 1;
      pomo.updatePomoTime(pomo.sessionMinutes = 60);
    } else {
      document.querySelector(".pomodoro-minutes").textContent = (pomo.sessionMinutes / 60) - 1;
      pomo.updatePomoTime(pomo.sessionMinutes -= 60);
    }
    // animation
    document.querySelector(".pomodoro-minutes").classList.add("underline");
    setTimeout(function() {
      document.querySelector(".pomodoro-minutes").classList.remove("underline");
    }, 250);
  });

  document.getElementById("pomodoro-plus").addEventListener("click", function() {
    document.querySelector(".pomodoro-minutes").textContent = (pomo.sessionMinutes / 60) + 1;
    pomo.updatePomoTime(pomo.sessionMinutes += 60);
    // animation
    document.querySelector(".pomodoro-minutes").classList.add("underline");
    setTimeout(function() {
      document.querySelector(".pomodoro-minutes").classList.remove("underline");
    }, 250);
  });

  document.getElementById("break-minus").addEventListener("click", function() {
    if ((pomo.breakMinutes / 60) - 1 <= 1) {
      document.querySelector(".break-minutes").textContent = 1;
      pomo.updateBreakTime(pomo.breakMinutes = 60);
    } else {
      document.querySelector(".break-minutes").textContent = (pomo.breakMinutes / 60) - 1;
      pomo.updateBreakTime(pomo.breakMinutes -= 60);
    }

    // animation
    document.querySelector(".break-minutes").classList.add("underline");
    setTimeout(function() {
      document.querySelector(".break-minutes").classList.remove("underline");
    }, 250);
  });

  document.getElementById("break-plus").addEventListener("click", function() {
    document.querySelector(".break-minutes").textContent = (pomo.breakMinutes / 60) + 1;
    pomo.updateBreakTime(pomo.breakMinutes += 60);
    // animation
    document.querySelector(".break-minutes").classList.add("underline");
    setTimeout(function() {
      document.querySelector(".break-minutes").classList.remove("underline");
    }, 250);
  });
