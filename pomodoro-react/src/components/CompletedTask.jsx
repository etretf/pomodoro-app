export default function CompletedTask(props){
    return(
        <div className='task-item '>
            <div className='task-item-1'>
                <h3 className="m-0">{props.title}</h3>
                <p>{props.desc}</p>
            </div>
            <p className="min-w-fit text-xs text-content-base">
                {props.timestamp}
            </p>
        </div>
    )
}