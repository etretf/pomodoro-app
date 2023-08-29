import { useState } from 'react';
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

console.log(chat);

function handleClick()
{
    console.log("Emma is a pro");
    setData("Bob");
}

  return (
    <>
    <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Navbar />}
                >
                    <Route index element={<Home chat={chat} setChat={setChat}/>}/>
                    <Route path='study' element={<Home chat={chat} setChat={setChat}/>}/>
                    <Route path="progress" element={<Progress data={data} handleClick={handleClick}/>}/>
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

/*
<BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Navbar />}
                >
                    <Route index path="study" element={<Home/>}/>
                    <Route path="progress" element={<Progress data={data} handleClick={handleClick}/>}/>
                    <Route path="styleguide" element={<Styleguide/>}/>
                </Route>
                <Route path="*" element={<ErrorPage/>}/>

            </Routes>   
        </BrowserRouter>
        <Outlet/> 
*/