window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

function system_ready() {
  if (this._ready != null) this._ready();
  if (this._process != null) {
    window.requestAnimationFrame(this.system_process);
  }
}

function system_process(timestamp) {
  if (this.last_timestamp != null) {
    this._process(timestamp - this.last_timestamp);
  }
  this.last_timestamp = timestamp;
  window.requestAnimationFrame(this.system_process);
}

function system_start() {
  this.system_ready();
}

game_process = {
  'system_ready': system_ready,
  'system_process': system_process,
  '_ready': null,
  '_process': null,
  'last_timestamp': null,
  'start': system_start,
};
