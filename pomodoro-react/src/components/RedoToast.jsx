import {useState, useEffect} from "react";

export default function RedoToast()
{
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        setInterval(() => setTimer(prevValue => prevValue + 0.1), 100)
    }, [])

    return(
        <div className="alert p-2  flex flex-column flex-wrap">
            <progress className="progress w-full p-0 m-0" value={timer} max="5" ></progress>
            <div className='flex min-w-full items-center justify-between'>
            <span className='text-xst'>Title deleted</span>
            <button className="btn btn-xs w-28 btn-primary">Undo</button>
            <button className="btn btn-xs btn-circle btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            </div>
        </div>   
    )
        
}