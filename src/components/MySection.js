function MySection({me, room, roomCreator}) {
    console.log(roomCreator);

    function handleClick() {
        navigator.clipboard.writeText(window.location.href);
    }

    return (
        <div id="mySection">
            <p>Hello, {me.userName}</p>
            <div className="my-invitations">
                <p>Commune {room}</p>
                <button onClick={handleClick} className="copyButton">Copy Address to Clipboard</button>
            </div>
        </div>
    )
}

export default MySection;