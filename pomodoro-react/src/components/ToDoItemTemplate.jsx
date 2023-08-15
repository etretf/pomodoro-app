export default function ToDoItemTemplate()
{
    return(
        <div className='task-item task-item-edit'>
            <form className="w-full item-form">
                    <input type="text" placeholder="Title" className="input input-bordered input-sm w-full max-w-x" />
                    <input type="text" placeholder="Description" className="input input-bordered input-sm w-full max-w-x" />
                    <div className='form-btn'>
                    <button className='btn btn-sm btn-neutral'type='button'>Cancel</button>
                    <button className='btn btn-sm btn-primary'>Save</button>
                    </div>
                </form>
        </div>
    )
}

