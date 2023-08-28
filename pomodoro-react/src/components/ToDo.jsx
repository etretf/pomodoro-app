import ToDoItem from "./ToDoItem"
import ToDoItemTemplate from "./ToDoItemTemplate"
import { PlusIcon } from '@heroicons/react/24/solid'
import {useState, useEffect} from "react"
import { nanoid } from 'nanoid'

export default function ToDo()
{
    const [toDoItems, setToDoItems] = useState(
        JSON.parse(localStorage.getItem("toDoItems")) || []
    );
    console.log(toDoItems);
    const [showTemplate, setShowTemplate] = useState(false);
    const [editingItem, setEditingItem] = useState(false)

    useEffect(() => {
        localStorage.setItem("toDoItems", JSON.stringify(toDoItems))
    },[toDoItems])

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

    function deleteItem(id)
    {
        
        setToDoItems(prevValue => {
            const index = prevValue.findIndex(item => item.id === id)
            const newArr = [...prevValue]
            if(prevValue[index].complete)
            {
                newArr[index].display = false;
            }
            else
            {
                newArr.splice(index, 1)
            } 
            return(newArr);
        })
        
    }

    
    function hideTemplate(id)
    {
        if(id)
        {
            setEditingItem(false)
            setToDoItems(prevValue => prevValue.map(item => item.id === id? {...item, template: false} : {...item}))
        }
        setShowTemplate(false);
        
        
    }

    function displayTemplate()
    {
        setShowTemplate(true);
    }

    function handleSubmit(event, data, id)
    {
        event.preventDefault();
        if(id)
        {
            setEditingItem(false);
            setToDoItems(prevValue => (
                prevValue.map(item => item.id === id ? {...item, template: false, title: data.title, desc: data.desc} : {...item, template: false})
            ));
        }
        else 
        {
            setToDoItems(prevValue => {
                return([...prevValue, generateItem(data.title, data.desc)])
            });
        }
        hideTemplate();

    }

    function generateItem(title, desc)
    {
        return (
            {
                id: nanoid(),
                title: title,
                desc: desc,
                complete: false,
                template: false,
                display: true
            }
        )
    }

    function editItem(id)
    {
        setEditingItem(true);
        setShowTemplate(true);
        !showTemplate && setToDoItems(prevValue => prevValue.map(item => item.id === id? {...item, template: true} : {...item}))
    }

    function toggleTaskComplete(id)
    {
        setToDoItems(prevValue => prevValue.map(item => item.id === id? {...item, complete: !item.complete} : {...item}))
    }

    const items = toDoItems.filter(value => value.display)
    // console.log(toDoItems)
    const itemsDisplay = items.map(item => (
        item.template ?
        <ToDoItemTemplate 
        key={item.id} 
        cancelItem={() => hideTemplate(item.id)} 
        submitItem={handleSubmit} {...item}
        />
        :
        <ToDoItem 
        key={item.id} 
        {...item} 
        delete={() => deleteItem(item.id)} 
        edit={() => editItem(item.id)} 
        check={() => toggleTaskComplete(item.id)}
        disabled={showTemplate}/>
    ))
    console.log(items)
    


    return(
        <div className="full-w-component half-w-component to-do-component max-container">
            <div className="x-flex w-full">
                <h2>My Tasks</h2>
                <button 
                className="btn btn-outline btn-sm" 
                onClick={displayTemplate}
                disabled = {showTemplate}>
                <PlusIcon className="h-4 w-4 text-blue-500" /> 
                Add task</button>
            </div>
            {showTemplate && !editingItem && <ToDoItemTemplate cancelItem={hideTemplate} submitItem={handleSubmit}/>}
            {itemsDisplay}
        </div>
    )
}