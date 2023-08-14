import { Link } from "react-router-dom";
import {useState} from "react";
import Pomodoro from "./Pomodoro";
import ChatBot from "./ChatBot";
import ToDo from "./ToDo";

export default function Home() {

  const [timerFullScreen, setTimerFullScreen] = useState(false);

  function togglePomodoro() {
    setTimerFullScreen(prevValue => !prevValue)
  }
    return (
      <div className="grid-container container">
        <Pomodoro />
        <ToDo />
        <ChatBot />
      </div>
    );
  }