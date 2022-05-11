import {useState} from 'react';


function ChatMessage({ message }) {
    let [date, time] = message.createdAt.toLocaleString().split(',');
    return  (
        <article className="chat-message">
            <p className="message-text">{message.text}</p>
            <p className="message-deets">{message.from.userName} on {date} at {time}</p>
        </article>
    )
}

export default ChatMessage;