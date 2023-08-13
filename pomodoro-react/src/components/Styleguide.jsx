export default function Styleguide()
{
    return(
        <div>
            <h1>divs</h1>
            <div className="container grid grid-cols-2 gap-4 mx-auto">
                <div className="rounded-lg  bg-primary-content col-span-2 p-4">hello</div>
                <div className="rounded-lg  bg-primary-content col-span-1 p-4">hello</div>
                <div className="rounded-lg  bg-primary-content col-span-1 p-4">hello</div>
            </div>
            <br/>
            <hr/>
            <br/>

            <h2 className="text-2xl">Buttons</h2>
            <h3>regular button</h3>
            <button className="btn">Regular Button</button>

            <h3>active button</h3>
            <button className="btn btn-active">Active Button</button>

            <h3>Joined buttons</h3>
            <div className="join">
                <button className="btn btn-active join-item">Ghost Button</button>
                <button className="btn join-item">Ghost Button</button>
            </div>
            

            
        </div>
    )
}