import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Progress(props){
    
    const numTasks = [0,1,2,3]

    console.log(props);
    return(
        <div className="container grid gap-7">
            {/* <h1>My progress</h1>
            <Link to="/">Home</Link>
            <button onClick={props.handleClick}>Click me now!</button> */}
            <div className="border rounded-lg mx-auto max-w-full w-4/5 prose">
                <h1 className="p-5">My progress</h1>
                <canvas id="myProgressChart" style={{width:'700'}}></canvas>
            </div>

            <div className="border rounded-lg mx-auto max-w-full w-4/5 prose">
                <h1 className="p-5">Completed Tasks</h1>
                { numTasks.map((task, index) => <Task key={index}/>)}
            </div>
        </div>
    )
}


const daysOfTheWeek = [];


//  this will be changed when fetching from API?
function getDate(daysInPast){
    let date = new Date();
    date.setDate(date.getDate()-daysInPast);
    let weekday = date.toLocaleDateString('en-us', {weekday:'long'});
    return weekday;
}

function getWeekdays(){
    for(let i = 7; i > 0; i--){
        let newWeekday = getDate(i);
        daysOfTheWeek.push(newWeekday);
    }
    console.log(daysOfTheWeek);
}

getWeekdays();


const studySessionData = [0,1,3,4,4,2,0];
const barColours = ["#FFF","#FFF","#FFF","#FFF","#FFF","#FFF","#FFF"];

const myProgressChart = new Chart('myProgressChart', {
    type:'bar',
    data:{
        labels: daysOfTheWeek,
        datasets: [{
            data: studySessionData,
            backGroundColor: barColours,
        }]
    },
    options:{
    },
})


function Task(){
    return(
        <div className="flex border p-3 mb-3 mx-6 rounded max-w-full justify-between prose">
            <div className="">
                <h3 className="m-0">
                    BIT2002
                </h3>
                <p>
                    Take notes on chapter 10 and 11.
                </p>                      
            </div>
            <div className="flex items-center">
                <p>
                    Completed at 19:23, October 10, 2022.
                </p>
            </div>

        </div>
    )
}