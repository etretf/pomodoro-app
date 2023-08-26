

export default function ChatBubble(props)
{
    return (
        <div className="chat w-full chat-start">
                <div className="chat-header">{props.chatItem.question}</div>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img src="https://static.vecteezy.com/system/resources/previews/010/672/228/original/cute-funny-tomato-sticker-character-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-on-green-background-tomato-character-concept-vector.jpg" />
                    </div>
                </div>
                
                <div className="chat-bubble bg-base-100">{props.chatItem.content}</div>
        </div>
    )
}