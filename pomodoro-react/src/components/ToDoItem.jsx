import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

export default function ToDoItem(props)
{
    return(
        <div className='task-item'>
            <input type="checkbox"  className="checkbox" disabled={props.disabled} onChange={props.check} checked={props.complete}/>
            <div className='task-item-1 w-10/12'>
                <h3 className="m-0">{props.title}</h3>
                <p>{props.desc}</p>
            </div>
            <button className="icon-btn btn-sm" onClick={props.edit} disabled={props.disabled}>
                <PencilIcon className=" w-4 h-4 text-white-500 " />
            </button>
            <button className="icon-btn" onClick={props.delete} disabled={props.disabled}>
                <TrashIcon className=" h-4 w-4 text-white-500 " />
            </button>
        </div>
    )
}