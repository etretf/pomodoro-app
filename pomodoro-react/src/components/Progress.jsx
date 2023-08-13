import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function Progress(props){
    

    console.log(props);
    return(
        <>
            {/* <h1>My progress</h1>
            <Link to="/">Home</Link>
            <button onClick={props.handleClick}>Click me now!</button> */}
            <div className="border rounded-lg prose">
                <h1 className="">My progress</h1>
            </div>
            <div className="prose">
            <h2 >Type 1</h2>
            </div>

            
            <h2>Type 2</h2>

            <div >
                <p className="prose-sm">Small</p>
                <p className="prose-base">Small</p>
                <p className="prose-lg">Small</p>
                <p className="prose-xl">Small</p>
                <p className="prose-2xl">Small</p>

            </div>
        </>
    )
}