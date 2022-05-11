import Message from './Message';

function MessageHistory({targetUser, me, dms}){

    function renderMessages(){
        console.log("rendering  dm history with ", targetUser.userName);

        const targetElems = dms[targetUser.userID].map((dm, index)=>{
            return <Message message={dm} targetUser={targetUser} me={me} index={index} key={index} />
        });
        return targetElems;
    }

    return (
        <div id="targetDM-history">
            {targetUser.userID in dms ? renderMessages():<p>No messages yet.</p>}
         </div>
    )
}

export default MessageHistory;