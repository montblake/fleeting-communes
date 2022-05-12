import {useState} from 'react';


function Login({submitUserName, room, roomCreator}){
    const [userNameInput, setUserNameInput] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        submitUserName(userNameInput)
    }

    function handleChange(){
        setUserNameInput(document.querySelector('#userNameInputField').value);
    }


    return (
        <div id="login">
            {/* <p>Commune ID: {room}</p> */}
            <form id="userNameForm" onSubmit={handleSubmit}>
				<input type="text" id="userNameInputField" value={userNameInput} onChange={handleChange} placeholder={roomCreator? "Enter username to create commune" : "Enter username to join commune"} />
				<input type="submit" id="userNameSubmit" value="submit" />
			</form>
        </div>
    )
}

export default Login;