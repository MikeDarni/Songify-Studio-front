import { serial } from "./serial";
import ToolsSettingsContext from "../store/tools-settings-context";

export var port;
export var potA0VAL;

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", (event) => {
    let connectButton = document.querySelector("#connect");

    function connect() {
      port.connect().then(
        () => {
          console.log(port);
          console.log("Connected");
          connectButton.textContent = "Disconnect";
          port.onReceive = (data) => {
            let textDecoder = new TextDecoder();
            console.log(textDecoder.decode(data));
            potA0VAL = textDecoder.decode(data);
            potA0VAL = parseInt(potA0VAL);
          };
          port.onReceiveError = (error) => {
            console.log("Recevied error" + error);
          };
        },
        (error) => {
          console.log("Connection error: " + error);
        }
      );
    }

    connectButton.addEventListener("click", function () {
      if (port) {
        port.disconnect();
        connectButton.textContent = "Connect";
        port = null;
      } else {
        serial
          .requestPort()
          .then((selectedPort) => {
            port = selectedPort;
            connect();
          })
          .catch((error) => {
            console.log("Connection error: " + error);
          });
      }
    });

    serial.getPorts().then((ports) => {
      if (ports.length == 0) {
        console.log("No devices found.");
      } else {
        port = ports[0];
        connect();
      }
    });
  });
})();
