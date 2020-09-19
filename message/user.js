const users = [];

//thong tin 1 user khu join vao room
function userJoin(id,username,room){
    // tao ra user (object) luu thong tin
    const user = {id,username,room};

    users.push(user);
    return user;
}

function getCurrentUser(id){
    return users.find(user =>  user.id === id);
}


function userLeave(id){
    // tim ra object la user co id
    const index = users.findIndex(user => user.id === id);

    //Loai bo user vua tim duoc ra khoi users[]
    if(index !== -1 ){
        return users.splice(index,1)[0];
    }
}

function getRoomUsers(room){
    return users.filter(user => user.room === room);
}
module.exports = {
  userJoin,
  getCurrentUser,
    userLeave,
    getRoomUsers
};