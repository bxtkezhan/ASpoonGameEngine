function GameProcess(_ready=null, _process=null) {
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.oRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  var last_timestamp = null;

  function system_process(timestamp) {
    if (last_timestamp != null) {
      _process((timestamp - last_timestamp) * 0.001);
    }
    last_timestamp = timestamp;
    requestAnimationFrame(system_process);
  }

  this.start = function () {
    if (_ready != null) _ready();
    if (_process != null) {
      system_process();
    }
  }
}
