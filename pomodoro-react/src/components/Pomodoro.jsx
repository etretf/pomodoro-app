import { BackwardIcon, ChevronDownIcon, ChevronUpIcon, ForwardIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

export default function Pomodoro(props){

  const seconds = props.time % 60;
  const minutes = Math.floor(props.time / 60);


  return(
      <div className={`full-w-component relative justify-center`}>

      <div className="grid grid-flow-col gap-5 text-center auto-cols-max mb-3">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            <span style={{"--value":minutes}}></span>
          </span>
          min
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
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
          <ForwardIcon className='fill-current h-10 w-10'/>
        </button>
        
      </div>

        <label className="swap swap-rotate absolute bottom-2 right-4">
            <input type="checkbox" onChange={props.handleChange} id='bob'/>
            <ChevronDownIcon className="swap-off fill-current h-6 w-6 text-white-500 " />
            <ChevronUpIcon className="swap-on fill-current h-6 w-6 text-white-500 " />
        </label>
      </div>
    )
}