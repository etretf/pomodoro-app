import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Progress(props){
    
    const numTasks = [0,1,2,3]

    console.log(props);
    return(
        <div>
            {/* <h1>My progress</h1>
            <Link to="/">Home</Link>
            <button onClick={props.handleClick}>Click me now!</button> */}
            <div className="border rounded-lg mx-auto max-w-full w-4/5 prose">
                <h1 className="p-5">My progress</h1>
                <canvas id="myProgressChart" style={{width:'700'}}></canvas>
            </div>
            <div className="prose-lg">
            <p>Type 1</p>
            </div>

            <h2>Type 2</h2>

            <div >
                <p className="prose-sm">Small</p>
                <p className="prose-base">Small</p>
                <p className="prose-lg">Small</p>
                <p className="prose-xl">Small</p>
                <p className="prose-2xl">Small</p>

            </div>
            <div className="border rounded-lg mx-auto max-w-full w-4/5 prose">
                <h1 className="p-5">Completed Tasks</h1>
                { numTasks.map(task => <Task/>)}
            </div>
        </div>
    )
}

//  this will be changed when fetching from API
function getDate(daysInPast){
    let date = new Date();
    date.setDate(today.getDate()-daysInPast);
    return date;
}
let today = new Date();
today.setDate(today.getDate()-1);
today.toLocaleDateString('en-us', {weekday:'long'});
console.log(today);
// const event = new Date().toLocaleDateString('en-us', {weekday:'long'});
// console.log(event);
// for(let i = 0; i < 6; i++){
//     let weekday = 
// }

const daysOfTheWeek = [];

const myProgressChart = new Chart('myProgressChart', {
    type:'bar',
    data:{
        labels: daysOfTheWeek,
    },
    options:{},
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