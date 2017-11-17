window.requestAnimFrame = new function (){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
};

function asge_process(_ready=null, _process=null) {
  asge_process_obj = {
    _ready: _ready,
    _process: _process,
    last_timestamp: null,
    is_actived: false,

    _scene: new THREE.Scene(),
    _camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100),
    _renderer: new function () {
      var renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(0xffffff));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      return renderer;
    },

    system_process (timestamp) {
      if (this.is_actived) {
        if (this.last_timestamp != null) {
          this._process((timestamp - this.last_timestamp) * 0.001);
        }
        this.last_timestamp = timestamp;
        requestAnimationFrame(this.system_process.bind(this));
        this._renderer.render(this._scene, this._camera);
      }
    },

    start (use_ready=true) {
      if (this._ready != null && use_ready) {
        this._ready(this._scene, this._camera, this._renderer);
      }
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

function asge_input_event(_event, _params) {
  var keyboard_events = ['keydown', 'keyup', 'keypress'];
  var mouse_events = ['click', 'dblclick', 'mouseup', 'mousedown'];
  var touch_events = ['touchstart', 'touchend', 'touchmove', 'touchcancel'];

  if (keyboard_events.includes(_event)) {
    var _map = _params;
    document.addEventListener(_event, (event) => {
      const keyName = event.key;
      if (keyName in _map) _map[keyName](event);
    }, false);
  } else if (mouse_events.includes(_event) || touch_events.includes(_event)) {
    var callback = _params;
    document.addEventListener(_event, (event) => {
      callback(event);
    });
  }
}

var ASGE = {
  'Process': asge_process,
  'setInputEvent': asge_input_event,
};
