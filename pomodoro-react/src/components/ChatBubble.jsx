import tomato from "../img/tomato.png"

export default function ChatBubble(props)
{
    return (
        <div className="chat w-full chat-start">
                <div className="chat-header">{props.chatItem.question}</div>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img src={tomato} />
                    </div>
                </div>
                
                <div className="chat-bubble bg-base-100 text-current">{props.chatItem.content}</div>
        </div>
    )
}