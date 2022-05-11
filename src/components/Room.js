import {useEffect, useState} from 'react';
import Login from './Login';
import Commune from './Commune';
import {useLocation, useParams} from 'react-router-dom';


function Room(){
    const location = useLocation();

    const [userName, setUserName] = useState(null);
    
    function submitUserName(name){
        setUserName(name);
    }

    let params = useParams();
    let room = location.state;
    let roomCreator;

    console.log(room);

    if (room === null){
        room = params.roomID;
        roomCreator = false;
    } else {
        roomCreator = true;
    }
    
    return (
        <>
            {!userName ?
                <Login room={location.state || params.roomID} submitUserName={submitUserName} roomCreator={roomCreator} />
                :
                <Commune room={location.state || params.roomID} userName={userName} roomCreator={roomCreator}/>

            }
        </>
    )
}

export default Room;