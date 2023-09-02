import { useState, useEffect } from 'react';
import './App.css';
import {Route, Routes, BrowserRouter, Outlet} from 'react-router-dom';
import Progress from './components/Progress';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Navbar from './components/Navbar';
import Styleguide from './components/Styleguide';
import { nanoid } from 'nanoid';
import { useLocation } from 'react-router-dom';
import finish from './assets/finish.mp3';
import click from './assets/click.mp3';

function App() {

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fullDate = `${day}/${month}/${year}`;

// for mobile tabs
const [openTab, setOpenTab] = useState('timer');
const [currentSection, setCurrentSection] = useState();
const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);



const handleWindowResize = () => {
    setIsMobile(window.innerWidth <= 640);
}

const setLocation = (location) => {
    setCurrentSection(location);
}

useEffect(() => {
  window.addEventListener('resize', handleWindowResize);
  return () => {
      window.removeEventListener('resize', handleWindowResize);
  }
}, [])



useEffect(() => {
    if(currentSection === '/progress' && isMobile){
        setOpenTab('studyprogress');
    }
    else if(currentSection === '/progress' && !isMobile){
        setOpenTab('all');
    }
    else if(currentSection === '/study' && isMobile){
        setOpenTab('timer');
    }
    else if(currentSection === '/study' && !isMobile){
        setOpenTab('all');
    }
}, [currentSection, isMobile]);



const [data, setData] = useState({key:'value'});
const [chat, setChat] = useState([{1:2},{3:4}]);
//for toast
const [toast, setToast] = useState([{title:"bob", id: nanoid()}]);
//time in seconds
const studyTime = 1500; //25 minutes
const breakTime = 300; // 5minutes
const longBreakTime = 900; //15 minutes
const testTime = 5;//5 seconds, using for quick testing, not actual
const breakTest = 3;

// console.log(chat);`


//const [numSessions, setNumSessions] = useState();
const [isCounting, setIsCounting] = useState(false);
const [time, setTime] = useState(studyTime);
const [sessionType, setSessionType] = useState();
const [progressData, setProgressData] = useState(() => {
      if (localStorage.getItem("sessionData"))
      {
        const arrayToReturn = JSON.parse(localStorage.getItem("sessionData"))
        const dateExists = arrayToReturn.find(item => item.fullDate === fullDate)
        // console.log("hello",dateExists)
        return((dateExists) ? [...arrayToReturn] : [...arrayToReturn, {fullDate: fullDate, date: date, count: 0}] )
      }
      else {
        return ( [{fullDate: fullDate, date: date, count: 0}] )
      }
  }
);

//index of the today's date item in progressData

const currentIndex = progressData.findIndex(item => item.fullDate === fullDate);
// console.log(currentIndex)

// console.log("Array", progressData)

//limiting progressData to only contain the latest 7 entries

useEffect(() => {
    const newArray = progressData;
    const length = newArray.length;
    if(length > 7)
    {
      setProgressData(newArray.splice(length-7))
    }
}, [])

useEffect(() => {
    // console.log("update")
    localStorage.setItem("sessionData", JSON.stringify(progressData))
}, [progressData[currentIndex].count]);

useEffect(() => {
    if(progressData[currentIndex].count % 7 === 0 && progressData[currentIndex].count !== 0){
      setTime(longBreakTime);
      setSessionType('long break');
    }
    else if(progressData[currentIndex].count % 2 === 0){
      setTime(studyTime);
      setSessionType('study');
    }
    else{
      setTime(breakTime);
      setSessionType('short break');
    }
    // console.log(numSessions);
  }, [progressData[currentIndex].count]);

  useEffect(() => {
    if(time === 0 && isCounting === true){
      setIsCounting(false);
      const newArr = progressData;
      newArr[currentIndex].count = newArr[currentIndex].count + 1;
      setProgressData(newArr);
      playSFX(finish);
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

//play a sound effect 
const playSFX = (sfx) => {
    let audio = new Audio(sfx);
    audio.play();
}


//toggle the playing state
const handlePlayToggle = () =>{
  isCounting ? setIsCounting(false) : setIsCounting(true);
  playSFX(click);
}

//function to decrement the time
function handleDecrement(){
    setTime(time => time - 1);
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
  playSFX(click);
}

//function sets current timer to the end
function handleEnd(){
  setTime(0);
  setIsCounting(true);
  playSFX(click);
}

//function for handling tab switches

function handleStudyTabSwitch(tabName){
    setOpenTab(tabName);
}

//function for handling section switches (study vs. progress)
function handleSectionSwitch(sectionName){
    setCurrentSection(sectionName);
}




  return (
    <>
    <BrowserRouter>
            <Routes>
                    <Route
                        path='/'
                        element={<Navbar handleSectionSwitch={handleSectionSwitch} currentSection={currentSection} openTab={openTab} handleTab={handleStudyTabSwitch}  time={time} sessionType={sessionType} isCounting={isCounting} />}
                    >
                        <Route index element={<Home
                            openTab={openTab} 
                            chat={chat} 
                            setChat={setChat}
                            numSessions={progressData[currentIndex].count}
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
                            openTab={openTab}  
                            chat={chat} 
                            setChat={setChat}
                            numSessions={progressData[currentIndex].count}
                            isCounting={isCounting}
                            time={time}
                            sessionType={sessionType}
                            handlePlayToggle={handlePlayToggle}
                            handleDecrement={handleDecrement}
                            handleBeginning={handleBeginning}
                            handleEnd={handleEnd}
                            />}
                            />
                        <Route path="progress" element={<Progress date={date} openTab={openTab}/>}/>
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