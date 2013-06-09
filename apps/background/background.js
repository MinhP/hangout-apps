(function (global) {
  "use strict";
  var
    hapi,
    window = global.window,
    document = global.document,
    console = global.console,
    three = global.THREE;
 
  if (global.gapi && global.gapi.hangout) {
    hapi = global.gapi.hangout;
  }

  function App() {
    var renderer, scene, camera, last_tick = new Date().getTime();

    /*
     * Render & Animation loop
     */
    function tick() {
      var
        this_tick = new Date().getTime(),
        elapsed = this_tick - last_tick;

      // TODO: animate camera

      renderer.render(scene, camera);
      last_tick = this_tick; 
      global.requestAnimationFrame(tick);
    }

    function initialize() {
      var WEBGL_SUPPORT, room, tmp, i, colors = ["yellow", "red", "blue"];

      room = document.getElementById("room")
      
      if (!!global.WebGLRenderingContext) {
        room.innerHTML = "Sorry, a browser with WebGL support is required, try Chrome ;)";
        return;
      }
      
      renderer = new three.WebGLRenderer({preserveDrawingBuffer: true});
      renderer.setSize(300, 200);
      renderer.setClearColorHex(0, 1);
      
      scene = new three.Scene();
      camera = new three.PerspectiveCamera(45, 3 / 2, 0.1, 10000);
      scene.add(camera);
      
      tmp = new THREE.AmbientLight(0x333333);
      scene.add(tmp);
      
      // create wall textures
      for (i = 0; i < 3; i++) {
        
      }
      
      room.appendChild(renderer.domElement);
      
      tick();
    }

    hapi.onApiReady.add(function (e) {
      if (e.isApiReady) {
        console.log("Hangout API ready!");
        window.setTimeout(initialize, 1);
      }
    });
  }

  global.hangoutapp = new App();

}(this));
