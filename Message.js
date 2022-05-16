import { Card, CardContent, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef((props, ref) => {
  const isUser = props.userName === props.message.userName;
  return (
    <div ref={ref} className={`message  ${isUser && "message__user"}`}>
      <Card className={isUser ? "message-userCard" : "messageguestCard"}>
        <CardContent>
          <Typography color="black" variant="h5" component="h2">
            {!isUser && `${props.message.userName || "Unkown User"} :`}
            {props.message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
