import { useState, useEffect } from 'react';
import './App.css';
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom';
import Progress from './components/Progress';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Navbar from './components/Navbar';
import Styleguide from './components/Styleguide';

function App() {

const [data, setData] = useState({key:'value'});
const [chat, setChat] = useState([{1:2},{3:4}]);
//time in seconds
const studyTime = 1500; //25 minutes
const breakTime = 300; // 5minutes
const longBreakTime = 900; //15 minutes
const testTime = 5;//5 seconds, using for quick testing, not actual
const breakTest = 3;

// console.log(chat);

const [numSessions, setNumSessions] = useState(0);
const [timerFullScreen, setTimerFullScreen] = useState(false);
const [isCounting, setIsCounting] = useState(false);
const [time, setTime] = useState(studyTime);
const [finished, setFinished] = useState(false);
const [sessionType, setSessionType] = useState();
const [progressData, setProgressData] = useState(
    JSON.parse(localStorage.getItem("sessionData")) || []
);

useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let userSessions = progressData;
    console.log(userSessions);
    const dataEntry = {year:year, month:month, day:day, numSessions:numSessions}

}, [numSessions])

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


  return (
    <>
    <BrowserRouter>
            <Routes>
                    <Route
                        path='/'
                        element={<Navbar time={time} sessionType={sessionType} isCounting={isCounting} />}
                    >
                        <Route index element={<Home 
                            chat={chat} 
                            setChat={setChat}
                            numSessions={numSessions}
                            isCounting={isCounting}
                            time={time}
                            sessionType={sessionType}
                            handlePlayToggle={handlePlayToggle}
                            handleDecrement={handleDecrement}
                            handleBeginning={handleBeginning}
                            handleEnd={handleEnd}
                        />}
                        />
                        <Route path='study' element={<Home 
                            chat={chat} 
                            setChat={setChat}
                            numSessions={numSessions}
                            isCounting={isCounting}
                            time={time}
                            sessionType={sessionType}
                            handlePlayToggle={handlePlayToggle}
                            handleDecrement={handleDecrement}
                            handleBeginning={handleBeginning}
                            handleEnd={handleEnd}
                            />}
                            />
                        <Route path="progress" element={<Progress data={data}/>}/>
                        <Route path="styleguide" element={<Styleguide/>}/>
                    </Route>
                    <Route path="/*" element={<ErrorPage/>}/>                    
            </Routes>   
        </BrowserRouter>
    <Outlet/> 
    </>
  );
}

export default App;