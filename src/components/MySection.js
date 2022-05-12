function MySection({me, room, roomCreator}) {
    console.log(roomCreator);
    return (
        <div id="mySection">
            <p>Hello, {me.userName}</p>
            <p>Commune {room}</p>
        </div>
    )
}

export default MySection;