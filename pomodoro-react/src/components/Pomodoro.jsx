import { ChevronDownIcon, ChevronUpIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/solid'




export default function Pomodoro(props){
   
  console.log(props.time);
  return(
      <div className={`full-w-component relative justify-center`}>

      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            {/* <span style={{"--value":24}}></span> */}
          </span>
          min
        </div> 
        <div className="flex flex-col">
          <span className="countdown font-mono text-5xl">
            {/* <span style={{"--value":10}}></span> */}
            <span style={{"--value": props.time}}></span>
          </span>
          sec
        </div>
      </div>
      <div>
        <button className='btn-ghost' onClick={props.handlePlayToggle}>
          { props.isCounting ? 
          <PauseIcon className='fill-current h-6 w-6'/> :
          <PlayIcon className='fill-current h-6 w-6'/>
          }
          
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