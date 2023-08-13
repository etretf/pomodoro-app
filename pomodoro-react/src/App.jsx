import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Progress from './components/Progress';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Navbar from './components/Navbar';

function App() {

const [data, setData] = useState({key:'value'});

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
                    element={<Navbar/>}
                >
                    <Route index path="study" element={<Home/>}/>
                    <Route path="progress" element={<Progress data={data} handleClick={handleClick}/>}/>
                </Route>
                <Route path="*" element={<ErrorPage/>}/>

            </Routes>   
        </BrowserRouter>
    </>
  );
}

export default App;