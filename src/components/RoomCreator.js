import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RoomCreator(props) {
	const navigate = useNavigate();

	useEffect(()=>{
		const newRoom = uuidv4();
		navigate(`/${newRoom}`, {state: newRoom});	
	}, [navigate])


    return (
	  	<h2>Creating New Room</h2>
    );
  }

  export default RoomCreator;