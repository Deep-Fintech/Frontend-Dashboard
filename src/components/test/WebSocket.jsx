import React, { Component } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/");
// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

export class WebSocket extends Component {
  componentDidMount() {
    console.log("In componentDidMount");
    socket.on("test", (pl) => {
      console.log("In socket");
      console.log(pl);
    });
  }

  render() {
    return <div>Websocket COmponent</div>;
  }
}

export default WebSocket;
