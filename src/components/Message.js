function Message({message, targetUser, me }){
    let [date, time] = message.createdAt.toLocaleString().split(',');


    function renderNoteDetails(date, time){
        const noteDetails = "Note to Self from " + date + " at " + time;
        return noteDetails;
    }

    function renderMessageDetails(date, time, message, targetUser){
        let messageDetails = (message.isSender ? "Sent to " : "Received from ");
        messageDetails += (targetUser.userName + " on " + date + " at " + time);
        return messageDetails;
    }

    return (
        <div className="message">
            <p className="message-text">{message.text}</p>
            <p className="message-deets">
                {me.userID === targetUser.userID ? renderNoteDetails(date, time): renderMessageDetails(date, time, message, targetUser)}

            </p>
        </div>
    )
}

export default Message;