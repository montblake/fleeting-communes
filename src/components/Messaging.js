import User from './User';
import { useState, useEffect } from 'react';
import Messager from './Messager';
import MessageHistory from './MessageHistory';


function Messaging({me, currentUsers, ws, dms, setDMs }) {
    const [targetUser, setTargetUser] = useState(null);

    function renderUsers() {
        console.log('rendering users');
        return currentUsers.map((user)=>(
         
            <User user={user} isUserMe={user.userID === me.userID ? true : false}  key={user.userID} setTargetUser={setTargetUser} />
        ));
    }

    //  MESSAGING FUNCTIONS
    function prepareDirectMessage(text){
        console.log('hey, preparing a DM!')
        let createdAt = new Date();

        let newMessage = {
            text: text,
            isSender: true,
            createdAt: createdAt,
        }

        // push onto history of messages
        setDMs((prevState)=>{
            console.log(prevState);
            console.log(targetUser.userID);
            let oldTargetHistory = prevState[targetUser.userID];
            console.log(oldTargetHistory);
            return {...prevState, [targetUser.userID]: [...oldTargetHistory, newMessage]}
        })
        // if targetUser is not Me
        // add target and sends as dm to server for distribution
        if (targetUser.userID !== me.userID){
            const signedMessage = signMessage(text, me, createdAt);
            const packagedMessage = packageMessage(signedMessage, "direct message", targetUser)
            ws.send(JSON.stringify(packagedMessage));
        }
    }

    function signMessage(message, user, createdAt){
        const signedMessage = {from: user, text: message, createdAt: createdAt};
        return signedMessage;
    }

    function packageMessage(signedMessage, type, target){
        const packagedMessage = {
            type: type, 
            target: target,
            signedMessage: signedMessage,
        };
        return packagedMessage;
    }
    

    // function handleTargetSelection(e){
    //     console.log(e.target.innerHTML, e.target.dataset.userid);
    //     const newTarget = {
    //         userName: e.target.innerHTML,
    //         userID: e.target.dataset.userid,
    //     };
    //     setTargetUser(newTarget);        
    // }

    useEffect(() => {
        if (targetUser) {
            console.log(dms);
            console.log(targetUser.userID);
            console.log(targetUser.userID in dms)
            if (targetUser.userID in dms){
                console.log('Already a history');
            } else {
                setDMs((prevState) => {
                    return {...prevState, [targetUser.userID]: []};
                })
            }
        }
    }, [targetUser, dms, setDMs]);

    // THE ACTUAL DOM ELEMENTS
    return (
        <section id="messaging">
            <header id="messaging-header">
                <h2>Private Messaging</h2>
            </header>
            <main id="messaging-main">
                <div id="messaging-targets">
                    <h3>targets</h3>
                    <div id="currentUsers">
                        { currentUsers.length > 0 ? renderUsers(): <p>You are alone.</p>}
                        
                    </div>
                </div>
                <div id="target-history">
                    <div id="targetDM-header">
                        
                            <h3>
                            {targetUser?
                            "History with " + targetUser.userName
                            :
                            "History"
                            }
                            </h3> 
    
                    </div>
                    <div id="targetDM-main">
                        {
                            targetUser?
                            <>
                                <MessageHistory targetUser={targetUser} me={me} dms={dms} />
                                <Messager targetUser={targetUser} me={me} prepareDirectMessage={prepareDirectMessage} />
                            </>
                            :
                            <p>Please select a user from the list</p>
                        } 
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Messaging;