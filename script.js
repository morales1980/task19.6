class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }
  reset() {
    this.times= {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }
  print() {
    this.display.innerText = this.format(this.times);
  }
  format(times) {
    // return `${addZero(times.minutes)}:${addZero(times.seconds)}:${addZero(Math.floor(times.miliseconds))}`;
    return times.minutes + ' : ' + times.seconds + ' : ' + times.miliseconds;
  }
  addZero(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval( () => this.step(), 10);
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }
  calculate() {
    this.times.miliseconds +=1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds +=1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
  save() {
    const time = (this.times.minutes + ':' + this.times.seconds + ':' + this.times.miliseconds);
    const li = document.createElement('li');
    li.innerText = time;
    const ul = document.getElementById('results');
    ul.appendChild(li);
  }
  clearList() {
    const ul = document.getElementById('results');
    while(ul.firstChild) {
      ul.firstChild.remove();
    }
  }
}

const stopwatch = new Stopwatch(document.querySelector('#stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {stopwatch.reset(); stopwatch.print();});

const saveTime = document.getElementById('save');
saveTime.addEventListener('click', () => stopwatch.save());

const clearList = document.getElementById('clearList');
clearList.addEventListener('click', () => stopwatch.clearList());
