import ToDoItem from "./ToDoItem"
import ToDoItemTemplate from "./ToDoItemTemplate"
import { PlusIcon } from '@heroicons/react/24/solid'
import {useState} from "react"
import { nanoid } from 'nanoid'

export default function ToDo()
{
    const [toDoItems, setToDoItems] = useState([])
    const [addButton, setAddButton] = useState(true);

    function insertTemplate()
    {
        setToDoItems(prevValue => {
            const length = prevValue.length;
            return(
            length?
            (prevValue[length-1].type === "template" ? [...prevValue] : [...prevValue, generateItem("template")]) 
            :
            [...prevValue, generateItem("template")]
            )
        })
    }

    function insertItem()
    {
        setToDoItems(prevValue => (
            [...prevValue, generateItem("item")]
        ))
    }

    function generateItem(type)
    {
        return (
            {
                id: nanoid(),
                title: "placeholder",
                description: "placeholder",
                type: type==="template"? "template" : "item",
                complete: false,
            }
        )
    }
    
    console.log(toDoItems);
    const items = toDoItems.map(item => (
        item.type === "template" ? <ToDoItemTemplate /> : <ToDoItem />
    ))

    return(
        <div className="full-w-component half-w-component to-do-component">
            <div className="x-flex w-full">
                <h2>My Tasks</h2>
                <button 
                className="btn btn-outline btn-sm" 
                onClick={insertTemplate}
                disabled = {!addButton}>
                <PlusIcon className="h-4 w-4 text-blue-500" /> 
                Add task</button>
            </div>
                {items}
                

        </div>
    )
}