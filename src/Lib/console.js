import { serial } from "./serial";
import { player } from "../components/layout/TestPlayBar";

export var port;
export var potVal;
export var potName;

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", (event) => {
    let connectButton = document.querySelector("#connect");
    function connect() {
      port.connect().then(
        () => {
          console.log("Connected");
          connectButton.textContent = "Disconnect";
          port.onReceive = (data) => {
            let textDecoder = new TextDecoder();
            let textVal = textDecoder.decode(data);
            let decodedPotName = textVal.slice(0, 5);
            console.log("Pot name:", potName);
            if (potName === "MUTE") {
              player.volumeUp();
            }
            potName = decodedPotName;
            potVal = parseInt(textVal.slice(3));
            // console.log("POT VAL:", potVal);
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
