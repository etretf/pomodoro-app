import { Link, Outlet } from "react-router-dom";
export default function Root()
{
    return(
        <>
        <Link to="/study" className="btn btn-active join-item btn-outline btn-xs">Study</Link>
        <Link to="/progress" className="btn join-item  btn-xs btn-ghost">Progress</Link>
        <Outlet/>
        </>
    )
}