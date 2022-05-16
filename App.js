import { useEffect, useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import "./App.css";
import Message from "./Message";
import db from "./Firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import FlipMove from "react-flip-move";
// import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const collect = db.collection("Messages");

  useEffect(() => {
    //Fetching data from database
    collect.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({ message: doc.data(), id: doc.id }))
      );
    });
  }, []);
  useEffect(() => {
    // if it's blank[], code runs ONCE when the app component loads
    setUserName(prompt("Please Enter your name"));
  }, []); //[] condition

  const onChangeHandler = (event) => {
    const currentValue = event.target.value;
    setInput(currentValue);
  };

  const sendMessageHandler = (event) => {
    event.preventDefault();
    collect.add({
      message: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { userName: userName, message: input }]);
    setInput(""); //clear input
  };

  return (
    <div className="App">
      <img src="" alt="Facebook Messenger Icon" />
      <h1>I'm building a messenger app</h1>
      <h2>Welcome {userName}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter Message"
            aria-describedby="my-helper-text"
            value={input}
            onChange={onChangeHandler}
          />
          <Button
            className="app__button"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessageHandler}
          >
            Send Message
            {/* send */}
            {/* <SendIcon /> */}
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => {
        return (
          <FlipMove>
            {/* {message.userName}:{message.text} */}
            <Message
              key={message.id}
              userName={userName}
              message={message.message}
            />
          </FlipMove>
        );
      })}
      {/* {messages.map(
        //map unlike for-loop returns something
        (message) => (
          <Message userName={userName} message={message} />
        )
      )} */}
    </div>
  );
}

export default App;
