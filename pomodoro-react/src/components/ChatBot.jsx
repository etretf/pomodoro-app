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
    // console.log("chat" + {props})
    const [chatQuestion, setChatQuestion] = useState("")
    const [questionToDisplay, setQuestionToDisplay] = useState("")
    const [generatingText, setGenerating] = useState(false)
    const [chatError, setChatError] = useState(false);
    
    const handleSubmit = async (event, message) => {
        event.preventDefault()
        if(message.length < 1){
            setChatError(true)
        }
        else{
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
                        content: `${message} (in less than 50 words)`
                    }],
                }
                ).then((result) => {
                contentToAdd.content = result.choices[0].message.content;
                props.setChat(prevValue => ([...prevValue, contentToAdd]))
                setGenerating(false)
                }).catch(error => console.log(error)) 
        }

    }

    const handleChange = (event) => {
        setChatQuestion(event.target.value)
    }
    
    const handleFocus = (event) => {
        setChatError(false);
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
        <div className={`home-component max-container flex flex-col ${props.openTab !== 'chat' && props.openTab !== 'all' ? 'hidden' : ''} ${props.openTab === 'all' && 'flex flex-col half-w-component'}`}>
                <>
                    <form className="x-flex w-full" onSubmit={event => handleSubmit(event, chatQuestion)} onFocus={event => handleFocus(event)}> 
                        <input 
                        type="text" 
                        placeholder={chatError ? "Please enter a question." : "What would you like to know?"}
                        className={`${chatError ? 'input input-error w-full max-w-x' : 'input input-primary w-full max-w-x'} btn-md sm:btn-sm `} 
                        value={chatQuestion}
                        onChange={handleChange}/>
                        <button className={`btn btn-primary btn-md sm:btn-sm`}>Ask</button>
                    </form>            

                    <button 
                    className={`btn btn-ghost mr-auto my-3 btn-sm sm:btn-xs`} 
                    onClick={clearChat}
                    disabled={!props.chat.length}
                    >Clear Chat</button>                    
                </> 
                    <div className="max-container">
                {generatingText && <ChatBubble chatItem={{question: questionToDisplay, content: "Typing..."}}/>}
                {currentChat}          
                <ChatBubble chatItem={{question:"", content: "I'm here to help you study. Ask me anything."}}/>      
                <ChatBubble chatItem={{question:"", content: "Hi! I'm Pomodoro!"}}/>

            </div>            
        </div>
    )
}
