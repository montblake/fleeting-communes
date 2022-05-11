import {useState} from 'react';


function Messager({ targetUser, setTargetUser, prepareDirectMessage }){
    const [messageText, setMessageText] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        console.log('submitting');
        prepareDirectMessage(messageText);
        setMessageText("")
    }

    function handleChange(){
        console.log(document.querySelector('#dm-form-field').value);
        setMessageText(document.querySelector('#dm-form-field').value);
    }

    return (
        <div id="messager">
            <form id="dm-form" onSubmit={handleSubmit}>
                <input type="text" id="dm-form-field" onChange={handleChange} value={messageText}/>
                <input type="submit" id="dm-form-button" value="send" />
            </form>
        </div>
    )
}

export default Messager;