import { useState } from "react";
import { OpenAI } from "openai";
import ChatBubble from "./ChatBubble";
import { nanoid } from "nanoid";


const openai = new OpenAI(
    {
        //apiKey: import.meta.env.VITE_API_KEY,
        apiKey: "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",
        dangerouslyAllowBrowser: true
    }
)

export default function ChatBot(props)
{
    //const [chat, setChat] = useState([
    //]);
    const [chatQuestion, setChatQuestion] = useState("")
    const [questionToDisplay, setQuestionToDisplay] = useState("")
    const [generatingText, setGenerating] = useState(false)

    
    const handleSubmit = async (event, message) => {
        event.preventDefault()
        setChatQuestion("")
        setQuestionToDisplay(message);
        setGenerating(true)
        let contentToAdd = {question: message,content: ""}
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
              contentToAdd.content = result.choices[0].message.content;
              props.setChat(prevValue => ([...prevValue, contentToAdd]))
              setGenerating(false)
              console.log(props.chat)
            }).catch(error => console.log(error))
    }

    const handleChange = (event) => {
        setChatQuestion(event.target.value)
    }

    const clearChat = () => {
        props.setChat([])
    }

    const currentChat = props.chat.map(item => (
        <ChatBubble 
        key={nanoid()} 
        chatItem={item} />
    ))

    currentChat.reverse()

    return(
        <div className="full-w-component half-w-component max-container">
            
            <form className="x-flex w-full" onSubmit={event => handleSubmit(event, chatQuestion)}> 
                <input 
                type="text" 
                placeholder="What would you like to know?" 
                className="input input-primary input-sm w-full max-w-x" 
                value={chatQuestion}
                onChange={handleChange}/>
                <button className='btn btn-sm btn-primary'>Go</button>
            </form>
            <button 
            className="btn btn-xs btn-ghost mr-auto my-3" 
            onClick={clearChat}
            disabled={!props.chat.length}
            >Clear Chat</button>
            <div className="max-container">
                {generatingText && <ChatBubble chatItem={{question: questionToDisplay, content: "Typing..."}}/>}
                {currentChat}
                <ChatBubble chatItem={{question:"", content: "Hi! I'm Pomodoro, a tomato!"}}/>
            </div>
            
        </div>
    )
}


/*className="w-full h-fit rounded-md border-primary border bg-base-100 px-3 px-2 h-20 max-h-fit justify-self-end">*/