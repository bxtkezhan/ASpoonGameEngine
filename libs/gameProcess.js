window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

function GameProcess(_ready=null, _process=null) {
  var last_timestamp = null;
  function system_ready() {
    if (_ready != null) _ready();
    if (_process != null) {
      window.requestAnimationFrame(system_process);
    }
  }

  function system_process(timestamp) {
    if (last_timestamp != null) {
      _process((timestamp - last_timestamp) * 0.01);
    }
    last_timestamp = timestamp;
    window.requestAnimationFrame(system_process);
  }

  this.start = function () {
    system_ready();
  }
}
