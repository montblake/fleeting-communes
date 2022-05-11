function MySection({me, room, roomCreator}) {
    console.log(roomCreator);
    return (
        <div id="mySection">
            <h3>Hello, {me.userName}</h3>
            <p>{roomCreator? 'You started ': 'You joined '} commune {room}</p>
        </div>
    )
}

export default MySection;