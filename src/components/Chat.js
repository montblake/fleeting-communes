import Chatter from './Chatter';
import ChatMessage from './ChatMessage';


function Chat({messages, setMessages, ws, me}) {
    const renderMessages = () => {
        return messages.map((message, index) => (
            <ChatMessage message={message} key={index}/>
        ));
    }

    function prepareChatMessage(message, user){
        let createdAt = new Date();

        console.log("hey, I am preparing a message");
        const signedMessage = signMessage(message, user, createdAt);
        addToChatLocally(signedMessage);
        const packagedMessage = packageMessage(signedMessage, "chat message");
        sendToServerForDistribution(packagedMessage);
    }

    function signMessage(message, user, createdAt){
        const signedMessage = {from: user, text: message, createdAt: createdAt};
        return signedMessage;
    }

    function packageMessage(signedMessage, type){
        const packagedMessage = {type: type, signedMessage: signedMessage};
        return packagedMessage;
    }

    function sendToServerForDistribution(packagedMessage) {
        ws.send(JSON.stringify(packagedMessage));
    }

    function addToChatLocally(signedMessage){
        setMessages((prevState) => {
            return [...prevState, signedMessage];
        });
    }

    return (
        <section id="chat">
            <header id="chat-header">
                <h2>Communal Chat</h2>
            </header>
            <main id="chat-main">
                <div id="chat-main-messages">
                    {messages.length > 0 ? renderMessages() : <p>No messages to show.</p>}

                </div>
                <Chatter me={me} prepareChatMessage={prepareChatMessage} />
            </main>
        </section>
    );
}

export default Chat;