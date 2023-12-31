import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CompletedTask from "./CompletedTask.jsx"
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

const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];




export default function Progress(props){
    const daysOfTheWeek = getWeekdays();
    const [weeklyArray, setWeeklyArray] = useState([
        createDateString(6),
        createDateString(5),
        createDateString(4),
        createDateString(3),
        createDateString(2),
        createDateString(1),
        createDateString(0)
    ])
    const [toDoItems, setToDoItems] = useState(
        JSON.parse(localStorage.getItem("toDoItems")) || []
    )
    const [progressData, setProgressData] = useState(
        JSON.parse(localStorage.getItem("sessionData")) || []
    )

    // console.log("progress",weeklyArray)

    //function will generate an object for each dat in the past 7 days
    function createDateString(daysToSubtract)
    {
        let dateToConvert = new Date(props.date);
        dateToConvert.setDate(dateToConvert.getDate() - daysToSubtract)
        const year = dateToConvert.getFullYear();
        const month = dateToConvert.getMonth() + 1;
        const day = dateToConvert.getDate();
        const fullDate = `${day}/${month}/${year}`;
        return {fullDate, dateToConvert, count:0};
    }

    useEffect(() => {
        if(toDoItems)
        {
            let toDisplay = toDoItems.filter(item => item.complete);
            setToDoItems(toDisplay);
        }

        //updating date count of the relevant dates in the past 7 days 
        setWeeklyArray(prevValue => (
            prevValue.map(item => {
                const indexOfSessionDate = progressData.findIndex(i => i.fullDate === item.fullDate)
                return({...item, count: indexOfSessionDate > -1 ? progressData[indexOfSessionDate].count : item.count})
            }))
        )


    }, [])

    // function gets the date for a specific number of days in the past
    function getDate(daysInPast){
        let date = new Date();
        date.setDate(date.getDate()-daysInPast);
        let weekday = date.toLocaleDateString('en-us', {weekday:'long'});
        return weekday;
    }

    // function gets the previous 7 days
    function getWeekdaysOnly(){
        let weekdays = [];
        for(let i = 7; i > 0; i--){
            let newWeekday = getDate(i);
            weekdays.push(newWeekday);
        }
        return weekdays;       
    }

    //function gets the previous 7 days and generates a random number of study sessions for each day
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

    // Chart

    


    //const labels = getWeekdaysOnly();
    //getting the date labels for the graph
    const labels = weeklyArray.map((item, index) => {
        const shortDate = monthNames[item.dateToConvert.getMonth()] + " " + item.dateToConvert.getDate();
        return(index == 6 ? "Today" :  shortDate)
    });

    const data = {
        //labels,
        labels,
        datasets: [
            {
                label: 'Study sessions',
                data: weeklyArray.map(item => Math.ceil(item.count /2)),
                backgroundColor: 'rgb(75, 192, 192)'
            },
        ]
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          
        },
    };    

    const mobileOptions = {
        maintainAspectRatio: false,
        indexAxis : 'y',
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        }
    }

    return(
        <div className={`h-full container flex flex-col gap-4 min-h-fit ${props.openTab == "all" && "py-4"}`}>
            <div className={`progress-chart rounded-lg col-span-2 p-4 flex flex-col items-center bg-base-200 ${props.openTab === 'studyprogress' || props.openTab === 'all' ? '' : 'hidden'}`}>
                <h2 className="p-5">My progress</h2>
                { props.openTab === 'all' && 
                    <div className="graph-div">
                        <Bar options={options} data={data}/>
                    </div>                
                }
                { props.openTab === 'studyprogress' && 
                    <div className="h-full w-full p-5">
                        <Bar options={mobileOptions} data={data}/>
                    </div>
                }
            </div>
            <div className={`tasks rounded-lg col-span-2 p-4 items-center bg-base-200 to-do-component max-container ${props.openTab === 'tasks' || props.openTab ==='all' ? 'flex flex-col' : 'hidden'}`}>
                <h2 className="p-5">Completed Tasks</h2>
                {toDoItems.map((task, index) => <CompletedTask key={index} {...task}/>)}
            </div> 
        </div>
    )
}
