import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import Pomodoro from "./Pomodoro";
import ChatBot from "./ChatBot";
import ToDo from "./ToDo";

//time in seconds
const studyTime = 1500; //25 minutes
const breakTime = 300; // 5minutes
const longBreakTime = 900; //15 minutes
const testTime = 5;//5 seconds, using for quick testing, not actual
const breakTest = 3;

export default function Home(props) {
  const [timerFullScreen, setTimerFullScreen] = useState(false);

  function togglePomodoro() {
    setTimerFullScreen(prevValue => !prevValue)
  }
    return (
      <div className={`grid-container container ${timerFullScreen? "span-2": ""} pomodoro`}>
        <Pomodoro
          openTab={props.openTab}
          handleChange={togglePomodoro} 
          handlePlayToggle={props.handlePlayToggle}
          handleBeginning={props.handleBeginning}
          handleEnd={props.handleEnd}
          handleRewind={props.handleRewind}
          handleSkip={props.handleSkip}
          showTimeFinished={props.showTimeFinished}
          isCounting={props.isCounting}
          sessionType={props.sessionType}
          numSessions={props.numSessions}
          time={props.time}
          />
        {!timerFullScreen && <ToDo layout={timerFullScreen} openTab={props.openTab} addToast={props.addToast}/>}
        {!timerFullScreen && <ChatBot layout={timerFullScreen} openTab={props.openTab} chat={props.chat} setChat={props.setChat}/>}
      </div>
    );
  }