import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { current } from "immer";
import { BookOpenIcon, BookmarkIcon, ChartBarIcon, ChatBubbleOvalLeftIcon, ClipboardDocumentCheckIcon, ClockIcon, DocumentCheckIcon, StopCircleIcon } from "@heroicons/react/24/solid";


export default function Root(props){
    const [currentTab, setCurrentTab] = useState(useLocation().pathname);
    const [currentTheme, setCurrentTheme] = useState(false);

    useEffect(()=>{
        if(currentTab === '/'){
            setCurrentTab('/study');
        }
        props.handleSectionSwitch(currentTab);    
    }, [currentTab]);    
    

    const seconds = props.time % 60;
    const minutes = Math.floor(props.time / 60);

    useEffect(() => {
        const setTheme = currentTheme ? ("data-theme","winter") : ("data-theme","night");
        document.querySelector("html").setAttribute("data-theme",setTheme);
    }, [currentTheme])

    function switchTab(id){
        setCurrentTab(id)
    }

    function switchTheme(event){
        setCurrentTheme(event.target.checked)
    }

    return(
        <>
        <nav className="navbar bg-base-100 container">
        <div className="navbar-start">
            <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
            <input type="checkbox" checked={currentTheme} onChange={switchTheme}/>
            
            {/* sun icon */}
            <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
            
            {/* moon icon */}
            <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            </label>
            {/* mini-timer */}
            {
                currentTab === '/progress' && props.isCounting && props.openTab === 'all' &&
                <div className="mini-timer join ml-5">
                    <div className="join-item text-base btn no-animation pointer-events-none">{props.sessionType === 'study' ? "Study" : "Break"}</div>
                    <div className="join-item text-base btn no-animation pointer-events-none w-20">{minutes}:{ seconds < 10 ? "0" + seconds : seconds}</div>
                </div>                
            }

        </div>
        <div className="navbar-end join">
            <Link 
            to="/study" 
            className={`btn join-item btn-sm sm:btn-xs btn-ghost ${currentTab === "/study" ? "btn-active" : null}`}
            id="study" 
            onClick={() => 
            {
                switchTab("/study");
                props.handleSectionSwitch('/study');
            }}>
                Study
                { props.openTab !== 'all' && props.isCounting && props.openTab !== 'timer' &&
                <span>
                    {minutes}:{ seconds < 10 ? "0" + seconds : seconds}
                </span>                 
                }
   
            </Link>
            <Link 
            to="/progress" 
            className={`btn join-item btn-sm sm:btn-xs btn-ghost ${currentTab === "/progress" && "btn-active"}`}
            id="progress" 
            onClick={() => 
            {
                switchTab("/progress");
                props.handleSectionSwitch('/progress');
            }}>
                Progress</Link>
        </div> 
        </nav>
        <Outlet/>
        { props.currentSection === '/study' &&
        <footer className="footer-nav sm:hidden sticky bottom-0">
            <div className="w-full py-2 flex justify-center gap-8 mb-5">
                <div>
                    <button onClick={()=>props.handleTab('todo')} className={`btn btn-ghost btn-md rounded-full ${props.openTab === 'todo' ? 'bg-base-200' : ''}`}>
                        <ClipboardDocumentCheckIcon/>
                        To-do
                    </button>
                </div>
                <div>
                    <button onClick={()=>props.handleTab('timer')} className={`btn btn-ghost btn-md rounded-full ${props.openTab === 'timer' ? 'bg-base-200' : ''}`}>
                        <ClockIcon/>
                        Timer
                    </button>
                </div>
                <div>
                    <button onClick={()=>props.handleTab('chat')} className={`btn btn-ghost btn-md rounded-full ${props.openTab === 'chat' ? 'bg-base-200' : ''}`}>
                        <ChatBubbleOvalLeftIcon/>
                        Chat
                    </button>
                </div>
            </div>
        </footer>        
        }
        { props.currentSection === '/progress' && 
        <footer className="footer-nav sm:hidden sticky bottom-0">
        <div className="w-full py-2 flex justify-center px-10 mb-10">
                <div>
                    <button onClick={()=>props.handleTab('studyprogress')} className={`btn btn-ghost btn-md rounded-full mb-2 ${props.openTab === 'studyprogress' ? 'bg-base-200' : ''}`}>
                        <ChartBarIcon className="w-10 block pb-2 min-h-fit"/>
                        Study Progress
                    </button>
                </div>
                <div>
                    <button onClick={()=>props.handleTab('tasks')} className={`btn btn-ghost btn-md rounded-full ${props.openTab === 'tasks' ? 'bg-base-200' : ''}`}>
                        <DocumentCheckIcon className="w-10 block pb-2"/>
                        Completed Tasks
                    </button>
                </div>
            </div>            
        </footer>        
        }

        </>    
    )

}