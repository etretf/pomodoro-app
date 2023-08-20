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

export default function Home() {

  const [pomodoroTime, setPomodoroTime] = useState();
  const [numSessions, setNumSessions] = useState(0);
  const [timerFullScreen, setTimerFullScreen] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [time, setTime] = useState(testTime);


  useEffect(() =>{
    if(time === 0){
      setIsCounting(false);
      setNumSessions(numSessions => numSessions+1);
      
      // state is not updating in time to work with this
      // every 4 sessions, set to break time
      if(numSessions % 4 === 0){
      setTime(breakTime);
    }
    else setTime(testTime);
    }
    if(isCounting && time > -1){
      const increment = setInterval(handleDecrement, 1000);
      return () =>{
        clearInterval(increment);
      }      
    }
  }, [isCounting, time]);


  // To-do:
  // If the counting state is true, continue to decrement the timer based on the study time every second
  // If the counting state is false, stop decrementing the time
  // After the time is up, reset the time for the next session and update the completed sessions count
  // Determine if the next session is a study session or break session
  // Use % 4 or something to determine if it is the 4th session, if yes then the longer break is the next session
  

  //toggle the playing state
  const handlePlayToggle = () =>{
    isCounting ? setIsCounting(false) : setIsCounting(true);
    // console.log(isCounting);
  }

  //function to decrement the time
  function handleDecrement(){
      setTime(time => time - 1);
      // console.log(time);      
  }


  function togglePomodoro() {
    setTimerFullScreen(prevValue => !prevValue)
  }
    return (
      <div className={`grid-container container ${timerFullScreen? "span-2": ""}`}>
        <Pomodoro 
          handleChange={togglePomodoro} 
          handlePlayToggle={handlePlayToggle}
          isCounting={isCounting}
          time={time}
          />
        {!timerFullScreen && <ToDo layout={timerFullScreen}/>}
        {!timerFullScreen && <ChatBot layout={timerFullScreen}/>}
      </div>
    );
  }