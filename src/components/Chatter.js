import { useState } from "react";


function Chatter({prepareChatMessage, me}){
    const[messageText, setMessageText] = useState("");

    function handleChange(e){
        console.log(document.querySelector("#chat-form-field").value)
        setMessageText(document.querySelector("#chat-form-field").value);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("Handling Submission...");
        prepareChatMessage(messageText, me);
        setMessageText("");
    }

    return(
        <div id="chat-input">
            <form id="chat-form" onSubmit={handleSubmit}>
                <input type="text" id="chat-form-field" onChange={handleChange} value={messageText}/>
                <input type="submit" id="chat-form-button" value="send" />
            </form>
        </div>
    );
}

export default Chatter;