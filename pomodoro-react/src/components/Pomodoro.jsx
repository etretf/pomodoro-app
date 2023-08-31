import { BackwardIcon, ChevronDownIcon, ChevronUpIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

export default function Pomodoro(props){

  const seconds = props.time % 60;
  const minutes = Math.floor(props.time / 60);


  return(
      <div className={`home-component relative justify-center overflow-auto ${props.openTab !== 'timer' ? 'hidden' : 'flex flex-col' }`}>

      <div className='btn no-animation pointer-events-none bg-base-300 flex gap-7 m-10 p-2 join'>
          <p className={ props.sessionType === 'short break' || props.sessionType === 'long break' ? "text-primary text-xl join-item" : "text-neutral text-xl join-item"}>
            Break: {Math.floor(props.numSessions / 2)} 
          </p>
          <p className={ props.sessionType === 'study'? "text-primary text-xl join-item" : "text-neutral text-xl join-item"}>
            Study: {Math.ceil(props.numSessions / 2)}
          </p>
      </div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max mb-3">
        <div className="flex flex-col">
          <span className="countdown font-mono text-9xl">
            <span style={{"--value":minutes}}></span>
          </span>
          min
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-9xl">
            {/* <span style={{"--value":10}}></span> */}
            <span style={{"--value": seconds}}></span>
          </span>
          sec
        </div>
      </div>
      <div className='flex p-2 gap-2'>
        <button className='btn-ghost' onClick={props.handleBeginning}>
          <BackwardIcon className='fill-current h-10 w-10'/>
        </button>
        <button className='btn-ghost' onClick={props.handlePlayToggle}>
          { props.isCounting ? 
          <PauseIcon className='fill-current h-10 w-10'/> :
          <PlayIcon className='fill-current h-10 w-10'/>
          }
        </button>
        <button className='btn-ghost' onClick={props.handleEnd}>
          <ForwardIcon className='fill-current h-10 w-10 '/>
        </button>
        
      </div>

        <label className="swap swap-rotate absolute bottom-2 right-4 hidden sm:inline-block">
            <input type="checkbox" onChange={props.handleChange} id='bob'/>
            <ChevronDownIcon className="swap-off fill-current h-6 w-6 text-white-500 " />
            <ChevronUpIcon className="swap-on fill-current h-6 w-6 text-white-500 " />
        </label>
      </div>
    )
}