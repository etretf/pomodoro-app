import { useState } from "react"

export default function ToDoItemTemplate(props)
{
    const [inputData, setInputData] = useState(
        props.template && {
            title: props.title,
            desc: props.desc
        }
        ||
        {
            title: "",
            desc: ""
        });

    function handleChange(event)
    {
        const {name, value} = event.target;
        setInputData(prevValue => {
            return({...prevValue, [name]: value})
        })
    }

    return(
        <div className={`task-item task-item-edit ${props.openTab === "todo" && "mb-3"}`}>
            <form className="w-full item-form py-2" onSubmit={() => props.submitItem(event, inputData, props.id)}>
                    <input 
                    type="text" 
                    placeholder="Title" 
                    className="input input-bordered input-sm w-full max-w-x" 
                    required
                    name = "title"
                    value={inputData.title}
                    onChange={handleChange}/>
                    <input 
                    type="text" 
                    placeholder="Description" 
                    className="input input-bordered input-sm w-full max-w-x" 
                    required
                    name="desc"
                    value={inputData.desc}
                    onChange={handleChange}/>
                    <div className='form-btn'>
                    <button className='btn btn-sm btn-neutral' type='button' onClick={props.cancelItem}>Cancel</button>
                    <button className='btn btn-sm btn-primary'>Save</button>
                    </div>
                </form>
        </div>
    )
}

