window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function asge_process(_ready=null, _process=null) {
  asge_process_obj = {
    _ready: _ready,
    _process: _process,
    last_timestamp: null,
    is_actived: false,

    system_process (timestamp) {
      if (this.is_actived) {
        if (this.last_timestamp != null) {
          this._process((timestamp - this.last_timestamp) * 0.001);
        }
        this.last_timestamp = timestamp;
        requestAnimationFrame(this.system_process.bind(this));
      }
    },

    start (use_ready=true) {
      if (this._ready != null && use_ready) this._ready();
      if (this._process != null) {
        this.last_timestamp = null;
        this.is_actived = true;
        this.system_process();
      }
    },

    stop() {
      this.is_actived = false;
    },

    getActive() {
      return this.is_actived;
    },
  }

  return asge_process_obj;
}

var ASGE = {
  'Process': asge_process,
};
