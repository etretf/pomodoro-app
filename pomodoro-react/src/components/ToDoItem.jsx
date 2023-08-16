import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

export default function ToDoItem()
{
    return(
        <div className='task-item'>
            <input type="checkbox"  className="checkbox" />
            <div className='task-item-1 w-10/12'>
                <h3 className="m-0">BIT2002</h3>
                <p>Take notes on Chapter 10 & 11.</p>
            </div>
            <button className="icon-btn btn-sm">
                <PencilIcon className=" w-4 h-4 text-white-500 " />
            </button>
            <button className="icon-btn">
                <TrashIcon className=" h-4 w-4 text-white-500 " />
            </button>
        </div>
    )
}