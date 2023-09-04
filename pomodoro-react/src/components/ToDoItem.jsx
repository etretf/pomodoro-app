import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

export default function ToDoItem(props)
{
    return(
        <div className={`task-item h-20 sm:h-auto ${props.openTab === "todo" && "mb-3"}`}>
            <input type="checkbox"  className="checkbox" disabled={props.disabled} onChange={props.check} checked={props.complete}/>
            <div className='task-item-1 w-10/12'>
                <h3 className="m-0">{props.title}</h3>
                <p>{props.desc}</p>
            </div>
            <button className="icon-btn btn-sm" onClick={props.edit} disabled={props.disabled}>
                <PencilIcon className="w-6 h-6 text-white-500 sm:w-4 sm:h-4" />
            </button>
            <button className="icon-btn" onClick={props.delete} disabled={props.disabled}>
                <TrashIcon className="h-6 w-6 text-white-500 sm:w-4 sm:h-4" />
            </button>
        </div>
    )
}