import { Link, Outlet } from "react-router-dom";

export default function Root(){
    return(
        <>
            <Link to="/study">Study</Link>
            <Link to="/progress">Progress</Link>
            <Outlet/>   
        </>        
    )

}