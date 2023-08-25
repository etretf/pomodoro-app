import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Progress(props){

    const daysOfTheWeek = getWeekdays();

    //  this will be changed when fetching from API?
    function getDate(daysInPast){
        let date = new Date();
        date.setDate(date.getDate()-daysInPast);
        let weekday = date.toLocaleDateString('en-us', {weekday:'long'});
        return weekday;
    }

    function getWeekdays(){
        let weekdays = [];
        for(let i = 7; i > 0; i--){
            let day = {};
            let newWeekday = getDate(i);
            day.weekday = newWeekday;
            day.numSessions = Math.floor(Math.random() * 7);
            weekdays.push(day);
        }
        return weekdays;
    }

    console.log(daysOfTheWeek);

    const numTasks = [0,1,2,3,4,5,6]

    console.log(props);
    return(
        <div className="grid-container container ">
            <div className="rounded-lg col-span-2 flex flex-col items-center bg-base-200 p-5 min-h-fit ">
                <h2 className="p-5">My progress</h2>
                    <div className="grid grid-cols-7 gap-4 p-10 w-full">
                        {daysOfTheWeek.map(day => {
                            return(
                                <div key={day.weekday}>
                                    <div className="h-48 flex justify-center pb-3">
                                        <div className="indicator h-full">
                                            <span className="indicator-item badge badge-primary p-4">
                                                <h3 className="font-bold">
                                                  {day.numSessions}  
                                                </h3>
        
                                            </span>
                                            <div className="mx-auto fill-current bg-primary-content border-2 w-10 rounded-md p-3 transition-all duration-200 ease-in-out hover:bg-current custom-tooltip" data-tip="hello">
                                                <span class="custom-tooltip-content">Custom tooltip</span>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <h3 className="text-center">{day.weekday}</h3>                                
                                </div>
                            )
                        })}
                    </div>
            </div>

            <div className="full-w-component to-do-component">
                <h2 className="p-5">Completed Tasks</h2>
                { numTasks.map((task, index) => <Task key={index}/>)}
            </div>
        </div>
    )
}





const studySessionData = [0,1,3,4,4,2,0];


function Task(){
    return(
        <div className='task-item '>
            <div className='task-item-1'>
                <h3 className="m-0">BIT2002</h3>
                <p>Take notes on Chapter 10 & 11.</p>
            </div>
            <p>
                Completed at 19:23, October 10, 2022.
            </p>
        </div>
    )
}