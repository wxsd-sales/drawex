all_room_ID = []
module.exports = {
  createRoom: function (app, socket, all_room_info, all_users, io) {
    socket.on('create_room', function (data) {
      var tempID = parseInt(Math.random() * 9999).toString(); 
      console.log("tempID before")
      console.log(tempID)
      while (all_room_ID.indexOf(tempID) >= 0) {
        tempID = parseInt(Math.random() * 9999).toString();
        console.log("tempID after")
        console.log(tempID)
      }
      var user = null;
      for (i = 0; i < all_users.length; i++) {
        if (all_users[i].userName === data.userName) {
          user = all_users[i]
          console.log("users")
          console.log(users)
        }
      }
      all_room_ID.push(tempID)
      data.room.roomID = tempID;
      data.room.currentPlayers = 0;
      data.room.scoreBoard = [];
      data.room.messages = [];
      data.room.game = { status: "waiting", round: 0, drawer: null, drawerindex: null, currentRound: 1, word: null, canvas: null, num_of_right: 0 };
      data.room.globalStatus = "waiting"
      data.room.host = data.userName
      data.room.currentPlayers += 1;
      var userScoreBoard = { userName: data.userName, score: 0, right: false };
      data.room.scoreBoard.push(userScoreBoard)
      //console.log("Create Room:", data.room)

      socket.emit('updateRoomInfo', all_room_info)

      all_room_info.push(data.room)
      socket.emit('updateRoomInfo', all_room_info)
      socket.broadcast.emit('updateRoomInfo', all_room_info)
      io.sockets.emit('updateRoomInfo', all_room_info)
      socket.PLAYER_INFO = { userName: data.userName, roomID: data.room.roomID }
      socket.join(data.room.roomID)
      socket.emit('joinRoomSuccess', data.room)
    });
  },
}
