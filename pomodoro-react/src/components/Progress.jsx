import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);


export default function Progress(props){

    const daysOfTheWeek = getWeekdays();
    const [toDoItems, setToDoItems] = useState(
        JSON.parse(localStorage.getItem("toDoItems")) || []
    )

    useEffect(() => {
        if(toDoItems)
        {
            let toDisplay = toDoItems.filter(item => item.complete);
            setToDoItems(toDisplay);
        }
    }, [])

    console.log("items",toDoItems)

    //  this will be changed when fetching from API?
    function getDate(daysInPast){
        let date = new Date();
        date.setDate(date.getDate()-daysInPast);
        let weekday = date.toLocaleDateString('en-us', {weekday:'long'});
        return weekday;
    }

    function getWeekdaysOnly(){
        let weekdays = [];
        for(let i = 7; i > 0; i--){
            let newWeekday = getDate(i);
            weekdays.push(newWeekday);
        }
        return weekdays;       
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

    // console.log(daysOfTheWeek);

    const ProgressBar  = (numSessions) => {
        console.log(Object.values(numSessions)[0])
        let height = Object.values(numSessions)[0];
        return(
            <div className={`progress-bar flex-grow h-${height * 10}`} data-tip="hello">
                <span className="custom-tooltip-content">Custom tooltip</span>
            </div>  
        )
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
    };

    const labels = getWeekdaysOnly();

    const data = {
        labels,
        datasets: [
            {
                label: 'Study sessions',
                data: daysOfTheWeek.map((day) => day.numSessions),
                backgroundColor: 'rgb(75, 192, 192)'
            }
        ]
    }
    

    console.log(props);
    return(
        <div className="container flex flex-col gap-4 max-h-fit min-h-full p-4">
            {/*
            <div className="rounded-lg col-span-2 flex flex-col items-center bg-base-200 p-5 progress-data">
                <h2 className="p-5">My progress</h2>
                    <div className="grid grid-cols-7 gap-4 p-10 w-full mt-auto">
                        {daysOfTheWeek.map(day => {
                            return(
                                <div key={day.weekday}>
                                    <div className="flex justify-center pb-3">
                                        <div className="indicator">
                                            <span className="indicator-item badge badge-secondary p-4">
                                                <h3 className="font-bold">
                                                  {day.numSessions}  
                                                </h3>
        
                                            </span>
                                            <ProgressBar numSessions={day.numSessions}/>                                      
                                        </div>
                                    </div>
                                    <h3 className="text-center">{day.weekday}</h3>                                
                                </div>
                            )
                        })}
                    </div>
                    </div> */}
            <div className="rounded-lg col-span-2 p-4 flex flex-col items-center bg-base-200">
                <h2 className="p-5">My progress</h2>
                <div className="graph-div">
                    <Bar options={options} data={data}/>
                </div>

            </div>
            <div className="rounded-lg col-span-2 p-4 flex flex-col items-center bg-base-200 to-do-component">
                <h2 className="p-5">Completed Tasks</h2>
                {toDoItems.map((task, index) => <Task key={index} {...task}/>)}
                </div> 
        </div>
    )
}





const studySessionData = [0,1,3,4,4,2,0];


function Task(props){
    console.log(props)
    return(
        <div className='task-item '>
            <div className='task-item-1'>
                <h3 className="m-0">{props.title}</h3>
                <p>{props.desc}</p>
            </div>
            <p>
                Completed at 19:23, October 10, 2022.
            </p>
        </div>
    )
}