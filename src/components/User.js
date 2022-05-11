function User({isUserMe, user, setTargetUser}){

    function handleClick(){
        console.log('clicked')
        // to keep online section (which does not have access to targetUser state or setTargetUser function) from causing errors BUT STILL ALLOW USER Component to be re-used
        if (setTargetUser){
            setTargetUser(user);
        }
    }

    console.log('rendering one of them');
    let classText = "message-partner"
    const identity = isUserMe ? " me" : " other";
    classText += identity;
    return (
        <div className={classText} id={`message-partner-${user.userID}`} onClick={handleClick}>
            <p>{user.userName}</p>
            {/* <video id={`remote-video-${user.userID}`} width="200px" autoPlay muted ></video> */}
        </div>
    )
}

export default User;