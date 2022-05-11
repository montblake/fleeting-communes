import User from './User';


function UsersOnline({me, currentUsers}) {
    function renderUsers(){
        console.log('rendering current users')

        return currentUsers.map((user)=>(
         
            <User me={user.userID === me.userID ? true : false} user={user} key={user.userID}/>
        ));
    }

    return (
        <section id="online">
            <header id="online-header">
                <h2>Communists</h2>
            </header>
            { currentUsers.length > 0 && renderUsers() }
        </section>
    )
}

export default UsersOnline;