import ToDoItem from "./ToDoItem"
import ToDoItemTemplate from "./ToDoItemTemplate"
import { PlusIcon } from '@heroicons/react/24/solid'
import {useState, useEffect} from "react"
import { nanoid } from 'nanoid'

const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

export default function ToDo(props)
{
    const [toDoItems, setToDoItems] = useState(
        JSON.parse(localStorage.getItem("toDoItems")) || []
    );
    // console.log(toDoItems);
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
                display: true,
                timestamp: ""
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
        const today = new Date()
        const hourFormat = today.getHours() > 11 ? " pm" : " am"
        const hours = today.getHours() % 12;
        const date = hours + ":" + today.getMinutes() + hourFormat + ", " + monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();
        setToDoItems(prevValue => prevValue.map(item => item.id === id? 
            {...item, complete: !item.complete, timestamp: date} 
            : 
            {...item}))
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
        openTab={props.openTab} 
        key={item.id} 
        {...item} 
        delete={() => deleteItem(item.id)} 
        edit={() => editItem(item.id)} 
        check={() => toggleTaskComplete(item.id)}
        disabled={showTemplate}/>
    ))
    // console.log(items)
    


    return(
        <div className={`home-component to-do-component max-container  ${props.openTab !== 'todo' && props.openTab !== 'all' ? 'hidden' : ''} ${props.openTab === 'all' && 'flex flex-col half-w-component'}`}>
            <div className="x-flex w-full">
                <h2>My Tasks</h2>
                {props.openTab === 'all' && 
                    <button 
                    className="btn btn-outline btn-sm" 
                    onClick={displayTemplate}
                    disabled = {showTemplate}>
                    <PlusIcon className="h-4 w-4 text-blue-500" /> 
                    Add task</button>                
                }

            </div>
            {props.openTab === 'todo' && 
                <button 
                className="btn btn-outline btn-lg my-5 w-full text-lg" 
                onClick={displayTemplate}
                disabled = {showTemplate}>
                <PlusIcon className="h-6 w-6 text-blue-500" />                     
                    Add task
                </button>             
            
            }
            {showTemplate && !editingItem && <ToDoItemTemplate openTab={props.openTab} cancelItem={hideTemplate} submitItem={handleSubmit}/>}
            {itemsDisplay}
        </div>
    )
}