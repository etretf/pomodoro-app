import { Link } from "react-router-dom";
import Pomodoro from "./Pomodoro";
import ChatBot from "./ChatBot";
import ToDo from "./ToDo";

export default function Home() {
    return (
      <div className="grid-container container">
        <Pomodoro />
        <ToDo />
        <ChatBot />
      </div>
    );
  }