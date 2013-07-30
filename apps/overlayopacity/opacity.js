(function (global) {
  "use strict";

  function App() {
    var
      hapi,
      doc = global.document,
      console = global.console,
      debug = doc.getElementById("debug"),
      main = doc.getElementById("opacity"),
      effects;

    if (global.gapi && global.gapi.hangout) {
      hapi = global.gapi.hangout;
    } else {
      console.log("Hangout API not found...");
      return;
    }

    function startEffect(e) {
      console.log(e);
    }

    function initialize() {
      var i, button;

      effects = [
        {
          "name": "lightning",
          "label": "Lightning"
        },
        {
          "name": "eyes",
          "label": "Flashing Eyes"
        }
      ];

      for (i = 0; i < effects.length; i++) {
        button = doc.createElement("button");
        button.innerHTML = effects[i].label;
        button.setAttribute("data-index", i);
        main.appendChild(button);
        button.onclick = startEffect;
      }
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
