import Countdown from 'react-countdown';

export default function Styleguide()
{
    return(
        <div>
            <h1>divs</h1>
            <div className="container grid grid-cols-2 gap-4 mx-auto">
                <div className="rounded-lg   col-span-2 p-4">hello</div>
                <div className="rounded-lg   col-span-1 p-4">hello</div>
                <div className="rounded-lg   col-span-1 p-4">hello</div>
            </div>


            <br/>
            <hr/>
            <br/>

            <h2 className="text-2xl">Buttons</h2>
            <h3>regular button</h3>
            <button className="btn btn-outline">Regular Button</button>

            <h3>active button</h3>
            <button className="btn btn-active  btn-outline neutral">Active Button</button>

            <h3>Joined buttons - primary colour</h3>
            <div className="join">
                <button className="btn btn-active join-item btn-outline">Ghost Button</button>
                <button className="btn join-item btn-outline">Ghost Button</button>
            </div>

            <h3>Joined buttons - secondary colour</h3>
            <div className="join">
                <button className="btn btn-active join-item btn-outline btn-secondary">Ghost Button</button>
                <button className="btn join-item btn-outline btn-secondary">Ghost Button</button>
            </div>
            

            <br/>
            <hr/>
            <br/>

            <h2 className="text-2xl">to do items</h2>
            <div className='task-item'>
                <input type="checkbox"  className="checkbox" />
                <div className='prose task-item-1 '>
                    <h3 className="prose-h3 m-0">BIT2002</h3>
                    <p className="prose-small">Take notes on Chapter 10 & 11.</p>
                </div>
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <h2 className="text-2xl">to do items-form</h2>
            <div className="task-item task-item-edit">
                <form className="w-full item-form">
                    <input type="text" placeholder="Title" className="input input-bordered input-sm w-full max-w-x" />
                    <input type="text" placeholder="Description" className="input input-bordered input-sm w-full max-w-x" />
                    <div className='form-btn'>
                    <button className='btn btn-secondary btn-sm'type='button'>Cancel</button>
                    <button className='btn btn-priamry btn-sm'>Save</button>
                    </div>
                </form>
                

            </div>
            </div>
    )
}