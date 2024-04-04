import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour = dateObject.getHours();
      const minute = dateObject.getMinutes();
      const second = dateObject.getSeconds();

      const currentTime = hour + " : " + minute + " : " + second;

      setTime(currentTime);
    }, 1000);
  }, []);

  return <div>{time}</div>;
}

export default Clock;
