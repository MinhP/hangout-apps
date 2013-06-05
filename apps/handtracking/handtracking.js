(function (global) {
  "use strict";
  var hapi, window = global.window, document = global.document, console = global.console;
  if (global.gapi && global.gapi.hangout) {
    hapi = global.gapi.hangout;
  }

  function App() {

    function initialize() {

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
