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
  const [pomodoroTime, setPomodoroTime] = useState();
  const [numSessions, setNumSessions] = useState(0);
  const [timerFullScreen, setTimerFullScreen] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [time, setTime] = useState(testTime);
  const [finished, setFinished] = useState(false);
  const [sessionType, setSessionType] = useState();

  useEffect(() => {
    if(time === 0 && isCounting === true){
      setIsCounting(false);
      setNumSessions(numSessions+1);
    }
    if(isCounting && time > -1){
      const increment = setInterval(handleDecrement, 1000);
      return () =>{
        clearInterval(increment);
      }      
    }
    // console.log(sessionType);
    // console.log(numSessions);
  }, [isCounting, time]);

  useEffect(() => {
    if(numSessions % 7 === 0 && numSessions !== 0){
      setTime(longBreakTime);
      setSessionType('long break');
    }
    else if(numSessions % 2 === 0){
      setTime(studyTime);
      setSessionType('study');
    }
    else{
      setTime(breakTime);
      setSessionType('short break');
    }
    // console.log(numSessions);
  }, [numSessions]);

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

  //function resets current timer to the beginning
  function handleBeginning(){
    switch (sessionType){
      case 'study':
        setTime(studyTime);
        break;
      case 'short break':
        setTime(breakTime);
        break;
      case 'long break':
        setTime(longBreakTime);
        break;
    }
  }

  //function sets current timer to the end
  function handleEnd(){
    setTime(0);
  }

  //function goes back 30 seconds
  function handleRewind(){
    setTime(time - 30);
  }

  //function skips forwards 30 seconds
  function handleSkip(){
    setTime(time + 30);
  }

  function showTimeFinished(){
    //to-do: visual indication that time is finished and play sound effect maybe
  }


  function togglePomodoro() {
    setTimerFullScreen(prevValue => !prevValue)
  }
    return (
      <div className={`grid-container container ${timerFullScreen? "span-2": ""}`}>
        <Pomodoro
          handleChange={togglePomodoro} 
          handlePlayToggle={handlePlayToggle}
          handleBeginning={handleBeginning}
          handleEnd={handleEnd}
          handleRewind={handleRewind}
          handleSkip={handleSkip}
          showTimeFinished={showTimeFinished}
          isCounting={isCounting}
          sessionType={sessionType}
          numSessions={numSessions}
          time={time}
          />
        {!timerFullScreen && <ToDo layout={timerFullScreen}/>}
        {!timerFullScreen && <ChatBot layout={timerFullScreen} chat={props.chat} setChat={props.setChat}/>}
      </div>
    );
  }