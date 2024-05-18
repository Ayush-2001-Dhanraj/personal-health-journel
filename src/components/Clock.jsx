import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      const hour =
        dateObject.getHours() < 10
          ? "0" + dateObject.getHours()
          : dateObject.getHours();
      const minute =
        dateObject.getMinutes() < 10
          ? "0" + dateObject.getMinutes()
          : dateObject.getMinutes();
      const second =
        dateObject.getSeconds() < 10
          ? "0" + dateObject.getSeconds()
          : dateObject.getSeconds();

      const currentTime = hour + " : " + minute + " : " + second;

      setTime(currentTime);
    }, 1000);
  }, []);

  return <Typography color="secondary">{time}</Typography>;
}

export default Clock;
