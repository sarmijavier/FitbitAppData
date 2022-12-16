import * as document from "document";
import { peerSocket } from "messaging";


let myRect = document.getElementById("button-1");


function sendMessage() {
  // Sample data
  const data = {
    title: 'My test data',
    isTest: true,
    records: [1, 2, 3, 4]
  }

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
}


myRect.addEventListener("click", (evt) => {
  console.log("Max message size=" + peerSocket.MAX_MESSAGE_SIZE);
  if (peerSocket.readyState === peerSocket.OPEN) {
     peerSocket.send("Hello");
  }
});