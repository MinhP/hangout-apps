(function (global) {
  "use strict";

  function App() {
    var
      hapi,
      document = global.document,
      console = global.console,
      THREE = global.THREE,
      renderer,
      scene,
      camera,
      last_tick = new Date().getTime(),
      update_interval = 100;

    if (global.gapi && global.gapi.hangout) {
      hapi = global.gapi.hangout;
    } else {
      console.log("Hangout API not found...");
      return;
    }

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
      var room, tmp, i, colors = ["yellow", "red", "blue"], canvas, ctx, y, step, texture, material, mesh;

      room = document.getElementById("room")
      
      if (!global.WebGLRenderingContext) {
        room.innerHTML = "Sorry, a browser with WebGL support is required, try Chrome ;)";
        return;
      }
      
      renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
      renderer.setSize(300, 200);
      renderer.setClearColor(new THREE.Color(0x000000));
      renderer.setClearColor(new THREE.Color(0xCCCCCC));
      
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 3 / 2, 0.1, 10000);
      camera.position.z = 300;
      scene.add(camera);
      
      tmp = new THREE.AmbientLight(0x333333);
      scene.add(tmp);
      
      // create wall textures
      for (i = 0; i < 3; i++) {
        canvas = document.getElementById("texture" + (i + 1));
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        step = Math.floor(canvas.height / 50);
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 2;
        for (y = Math.floor(step / 2); y < canvas.height; y+= step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
          ctx.closePath();
        }
        texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        material = new THREE.MeshBasicMaterial({map: texture});
        
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width, canvas.height), material);				
        mesh.doubleSided = true;
        mesh.position.x = -canvas.width;
        mesh.position.y = -canvas.height;
        mesh.position.z = 00;
        scene.add(mesh);
      }
      
      room.appendChild(renderer.domElement);
      
      tick();
    }

    hapi.onApiReady.add(function (e) {
      if (e.isApiReady) {
        console.log("Hangout API ready!");
        global.setTimeout(initialize, 1);
      }
    });
  }

  global.hangoutapp = new App();

}(this));
