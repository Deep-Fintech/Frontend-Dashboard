import Clock from "react-live-clock";
import React from "react";
import "moment-timezone";

function LiveClock() {
  return (
    <div>
      <h5>
        UTC: 
        <Clock
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"UTC"}
        />
      </h5>

      <h5>Colombo: 
        <Clock
          format={"HH:mm:ss"}
          ticking={true}
          timezone={"Asia/Colombo"}
        />
      </h5>
    </div>
  );
}

export default LiveClock;
