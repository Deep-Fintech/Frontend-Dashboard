import Clock from "react-live-clock";
import React from "react";
import "moment-timezone";
import { Typography } from "@mui/material";

function LiveClock() {
  return (
    <div>
      <Clock
        // style={{ fontSize: "1.5em" }}
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"UTC"}
      />
      <Typography variant="p"> UTC </Typography> <br />
      <Clock
        // style={{ fontSize: "1.5em" }}
        format={"HH:mm:ss"}
        ticking={true}
        timezone={"Asia/Colombo"}
      />
      <Typography variant="p"> Local </Typography>
    </div>
  );
}

export default LiveClock;
