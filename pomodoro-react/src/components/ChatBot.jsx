import { useState } from "react";
import { OpenAI } from "openai";
import ChatBubble from "./ChatBubble";
import { nanoid } from "nanoid";


const openai = new OpenAI(
    {
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true
    }
)

export default function ChatBot()
{
    const [chat, setChat] = useState([
        {role: "user", content: "hi"},
        {role: "assistant", content: "bye"}
    ]);
    const [chatQuestion, setChatQuestion] = useState("")
    const [generatingText, setGenerating] = useState(false)

    
    const handleSubmit = async (event, message) => {
        event.preventDefault()
        setChatQuestion("")
        setGenerating(true)
        setChat(prevValue => ([...prevValue, {role: "user", content: message}]))
        await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: `${message} (in less than 5 words)`
                  }],
              }
            ).then((result) => {
              setChat(prevValue => ([...prevValue, result.choices[0].message]))
              setGenerating(false)
              console.log(chat)
            }).catch(error => console.log(error))
    }

    const handleChange = (event) => {
        setChatQuestion(event.target.value)
    }

    const clearChat = () => {
        setChat([])
    }

    const currentChat = chat.map(item => (
        <ChatBubble 
        key={nanoid()} 
        chatItem={item} />
    ))

    return(
        <div className="full-w-component half-w-component to-do-component relative">
            <ChatBubble chatItem={{role: "assistant", content: "Hi! I'm Pomodoro, a tomato!"}}/>
            {currentChat}
            {generatingText && <ChatBubble chatItem={{role: "assistant", content: "Typing..."}}/>}
            <button 
            className="btn btn-xs btn-ghost  absolute right-2 top-2" 
            onClick={clearChat}
            disabled={!chat.length}
            >Clear Chat</button>
            <form className="x-flex w-full mt-auto" onSubmit={event => handleSubmit(event, chatQuestion)}> 
                <input 
                type="text" 
                placeholder="What would you like to know?" 
                className="input input-primary input-sm w-full max-w-x" 
                value={chatQuestion}
                onChange={handleChange}/>
                <button className='btn btn-sm btn-primary'>Go</button>
            </form>
        </div>
    )
}


/*className="w-full h-fit rounded-md border-primary border bg-base-100 px-3 px-2 h-20 max-h-fit justify-self-end">*/