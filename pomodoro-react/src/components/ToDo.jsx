import ToDoItem from "./ToDoItem"
import ToDoItemTemplate from "./ToDoItemTemplate"

export default function ToDo()
{
    return(
        <div className="full-w-component half-w-component to-do-component">
                <ToDoItem />
                <ToDoItem />
                
                <ToDoItemTemplate />

        </div>
    )
}