import { useState, useEffect } from 'react';
import Peer from 'peerjs';
import MySection from './MySection';
import UsersOnline from './UsersOnline';
import Chat from './Chat';
import Messaging from './Messaging';
import Videos from './Videos';


function Commune({room, roomCreator, userName}){
    const [userObj, setUserObj] = useState({userName: "", userID: ""});
    const [currentUsers, setCurrentUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [dms, setDMs] = useState({});
    const [websocket, setWebsocket] = useState(null);

    function addNewUserVideo(remoteStream, user){
        const videoCorral = document.querySelector('#video-corral');
        let newUserVideo = document.createElement('video');
        let newUser = document.createElement('div');

        let newUserName = document.createElement('p');
        newUserName.textContent = `${user.userName}`;
        newUser.id = `remote-user-${user.userID}`;
        newUserVideo.id = `remote-video-${user.userID}`;
        newUserVideo.srcObject = remoteStream;
        newUserVideo.play();
        newUser.appendChild(newUserVideo);
        newUser.appendChild(newUserName);
        videoCorral.appendChild(newUser);
    }

    function removeUser(id){
        console.log('removing user');
        console.log(id);
        // remove orphaned video elements
        const corral = document.querySelector('#video-corral')
        for (let child of corral.children){
            if (child.id = `remote-user-${id}`){
                child.remove();
            }
        }
    }

   

    useEffect(()=>{
        let myVideoStream;

         // make PeerServer
        const peerObj = {
            host: process.env.REACT_APP_PEER_URL,
            port: 443,
            path: '/peerjs',
        };
        console.log('peerObj:', peerObj);

        const peer = new Peer(peerObj);
        
    
        peer.on("open", (id) => {
            console.log('Peer Server Connected. PeerID:', id);
            const newUser = {userName: userName, userID: id, room: room};
            setUserObj(newUser);
    
            const ws = new WebSocket(process.env.REACT_APP_SOCKET_URL);
            
            ws.onopen = (socket) => {
                console.log('socket opened');
                ws.send(JSON.stringify({type: 'new user', userObj: newUser}));

                navigator.mediaDevices.getUserMedia({audio: false, video: true})
                .then((stream) => {
                    myVideoStream = stream;
                    addNewUserVideo(stream, newUser)
                })
                .catch((error) => console.log(error));
            }

            ws.onerror = function(error) {
                console.log('error:', error);
            }
    
            ws.onmessage = (message) => {
                message = JSON.parse(message.data);
                switch(message.type){
                    case 'new user':
                        console.log('we have a new user to add!!!');
                        console.log(message.userObj);
                        setCurrentUsers((prevState)=>{
                            return [...prevState, message.userObj]
                        });
                        // open Peer connection with new user
                        console.log('opening peer connection')
                        const conn = peer.connect(message.userObj.userID);
                        conn.on('open', ()=>{
                            console.log('connected to peerID:', message.userObj.userID);
                
                            const call = peer.call(
                                message.userObj.userID, 
                                myVideoStream, 
                                {metadata: {userName:  newUser.userName, userID: newUser.userID}}
                            );
                            console.log('just called peer for video', call);
                            call.on('stream', (remoteStream) => {
                                console.log('got a stream coming back!');
                                // add remoteStream to a video element
                                addNewUserVideo(remoteStream, message.userObj);
                            });
                        });
                        break;

                    case 'update users':
                        console.log("current users:", message.users);
                        const currentUsers = message.users;
                        setCurrentUsers(currentUsers);
                        break;

                    case 'remove user':
                        removeUser(message.userID);
                        break;


                    case 'chat message':
                        console.log('chat message received');
                        console.log(message.signedMessage);
                        setMessages((prevMessages) => {
                            return [...prevMessages, message.signedMessage];
                        });
                        break;

                    case 'direct message':
                        console.log('Receiving a DM!');
                        console.log(message.signedMessage);
                        console.log(message.signedMessage.createdAt.toLocaleString());
                        let createdAt = new Date();
                        let newMessage = {
                            text: message.signedMessage.text,
                            sender: false,
                            createdAt: createdAt,
                        }
                        
                        setDMs((prevState)=>{
                            if (message.signedMessage.from.userID in prevState){
                                const oldTargetMessages = prevState[message.signedMessage.from.userID];
                                const newTargetMessages = [...oldTargetMessages, newMessage]
                                return {...prevState, [message.signedMessage.from.userID]: newTargetMessages};
                            } else {
                                return {...prevState, [message.signedMessage.from.userID]: [newMessage]}
                            } 
                        });                  
                        break;

                    default:
                        console.log('message type unknown', message.type);
                }
            }
            setWebsocket(ws);
        });

        peer.on('call', (call) => {
            console.log('I am answering a call from a peer', call.metadata.userName);

            call.answer(myVideoStream);
            call.on('stream', (remoteStream) => {
                console.log('I just got a video stream');
                // attach remoteStream to a video element
                addNewUserVideo(remoteStream, call.metadata);
            });
        });

      }, [ userName, room ]);

    return (
        <div id="commune">
            <MySection me={userObj} room={room} roomCreator={roomCreator}/>
            <Videos />
            {/* <UsersOnline me={userObj} currentUsers={currentUsers}  /> */}
            <Messaging ws={websocket} me={userObj} currentUsers={currentUsers} dms={dms} setDMs={setDMs}/>
            <Chat me={userObj} ws={websocket} messages={messages} setMessages={setMessages} />
            
        </div>
    );
}

export default Commune;