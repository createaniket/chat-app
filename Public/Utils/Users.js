const users = []

const AddUser = ({ id, username, room}) => {

    username = username.trim().toLowerCase()

    room = room.trim().toLowerCase()

    if( !username || !room){

        error: 'Username and Room Required!'
    }

    const ExistingUser = users.find((user) =>{

        return 

        // dekhte h ki {} bina kaam kr rha h ?

            user.room === room && user.username === username
        
    })



    if(ExistingUser ){

        return { error: 'Username is in use!'}
    }



    //  store user


const user = {id, username, room}

users.push(user)

return{user}
}



const GetUser = (id) =>{

    return users.find((user) => user.id === id)
}

const getUserInRoom = (room) =>{

    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)

   
}

AddUser({
    id:22,
    username:"Anni",
    room:"LKO"
})





// To Remove User

const removeUser = (id) =>{

    const index = users.findIndex((user) => {

        return user.id === id 

    })

    if(index !== -1){

        return users.splice(index, 1)[0]
    }
}




module.exports = {
    AddUser,
    getUserInRoom,
    GetUser,
    removeUser
}