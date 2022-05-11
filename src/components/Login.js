import {useState} from 'react';


function Login({submitUserName, room, roomCreator}){
    const [userNameInput, setUserNameInput] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        console.log('Heyo')
        submitUserName(userNameInput)
    }

    function handleChange(){
        setUserNameInput(document.querySelector('#userNameInputField').value);
    }


    return (
        <div id="login">
            <p>commune id: {room}</p>
            <form id="userNameForm" onSubmit={handleSubmit}>
				<input type="text" id="userNameInputField" value={userNameInput} onChange={handleChange} placeholder={roomCreator? "Enter a username to create commune" : "Enter a username to join commune"} />
				<input type="submit" id="userNameSubmit" value="submit" />
			</form>
        </div>
    )
}

export default Login;