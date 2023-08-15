import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'

export default function ToDoItem()
{
    return(
        <div className='task-item'>
            <input type="checkbox"  className="checkbox" />
            <div className='prose task-item-1 '>
                <h3 className="prose-h3 m-0">BIT2002</h3>
                <p className="prose-small">Take notes on Chapter 10 & 11.</p>
            </div>
            <button className="icon-btn ">
                <PencilIcon className=" h-6 w-6 text-white-500 " />
            </button>
            <button className="icon-btn">
                <TrashIcon className=" h-6 w-6 text-white-500 " />
            </button>
        </div>
    )
}