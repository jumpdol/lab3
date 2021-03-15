import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import "./App.css";

const socket = io.connect("http://localhost:4000");

function App() {
  const [state, setStaet] = useState({ message: "", name: "Duloo" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("reschats", ({ name, message }) => {
      setChat((c) => [...c, { name, message }]);
      console.log(chat);
    });
  }, []);

  const onTextChange = (e) => {
    setStaet({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socket.emit("main", { name, message });
    setStaet({ message: "", name });
  };
  const handleChange = (e) => {
    const { name, message } = state;
    setStaet({ message, name: e.target.value });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        {console.log(name)}
        <h3 style={name === state.name ? { color: "red" } : { color: "blue" }}>
          {name} <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card" style={{ padding: "20px", display: "flex" }}>
      <form>
        <h1>Messanger</h1>
        <div className="name-field">
          Username:
          <select value={state.name} onChange={handleChange}>
            <option value="Duloo">Duloo</option>
            <option value="Nomio">Nomio</option>
          </select>
        </div>
        <div style={{ marginTop: "20px" }}>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <div
          style={{
            cursor: "pointer",
            backgroundColor: "grey",
            width: "100px",
            textAlign: "center",
            marginTop: "10px",
          }}
          onClick={() => onMessageSubmit()}
        >
          Send Message
        </div>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
