import ToDoItem from "./ToDoItem"
import ToDoItemTemplate from "./ToDoItemTemplate"
import { PlusIcon } from '@heroicons/react/24/solid'

export default function ToDo()
{
    return(
        <div className="full-w-component half-w-component to-do-component">
            <div className="x-flex w-full">
                <h2>My Tasks</h2>
                <button className="btn btn-outline btn-sm"><PlusIcon className="h-4 w-4 text-blue-500" /> 
                Add task</button>
            </div>
                <ToDoItem />
                <ToDoItem />
                <ToDoItem />
                <ToDoItem />
                <ToDoItem />
                
                <ToDoItemTemplate />

        </div>
    )
}