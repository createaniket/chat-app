const Generate = (username, text) => {

   
   return {

    username,
   text,
    CreatedAt : new Date().getTime()
}
}


const GenarateLocationMessage = (username, url) =>{

    return {

        username,
        url,
        CreatedAt: new Date().getTime()
    }
}

module.exports = {
    Generate,
    GenarateLocationMessage
}