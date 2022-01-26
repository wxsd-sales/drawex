import React, { useState } from 'react';
import RoomList from './roomList';
import CreateRoom from '../CreateRoom/CreateRoomModal/CreateRoomModal';

import publicRoom from '../../static/publicRoom.png';
import privateRoom from '../../static/privateRoom.png';
import allRoom from '../../static/allRoom.png';
import { useHistory } from "react-router-dom";
import './lobby.css';

export default function Lobby({ socket, userName, rooms, isLogin, embeddedAppSDK }) {
  const [roomType, setRoomType] = useState("All");
  const history = useHistory();


  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    socket.on('joinRoomSuccess', (data) => {
      const path = "/room/" + data.roomID;
      history.push(path);

    })
  }, []);

  const handleRoomSelection = (roomType) => {
    console.log("Room type: ", roomType);
    setRoomType(roomType);
  }

  React.useEffect(() => {

    socket.on('autoLoginFailed', () => {
      history.replace("/login")
      setLoading(false)
    })
  }, []);

  React.useEffect(() => {
    socket.on('autoLoginSuccess', () => {
      console.log("autologin success")
      setLoading(false)
      socket.emit('gameStats', (userName));
    })
  }, []);

  React.useEffect(() => {
    if (isLogin) {
      socket.emit('gameStats', (userName));
    } else {
      setLoading(true)
      socket.emit('autoLogin', (userName));
    }
  }, []);

  function handleCreateRoom(room) {
    const data = { room: room, userName: userName }
    socket.emit('create_room', data);
  }

  function handleJoinRoom(roomID) {
    const temp = { roomID: roomID, userName: userName }
    socket.emit('joinRoom', temp)
  }

  function handleLogout() {
    history.go();
    history.push('/login');
    localStorage.clear();
  }

  return (
    <div className="lobby flex">
      <div className="left flex">
        <div className="left-top glass-blur flex flex-column">
          <div className="account-bg">
            <div className="account-name">Hello, {userName}</div>
            <div className="logout-btn" onClick={e => handleLogout()}>Logout</div>
          </div>
          <div className="nav-room">
            <div className="nav-all nav-btn" onClick={e => handleRoomSelection("All")}>
              <div className="nav-icon"><img src={allRoom} alt="all room"></img></div>
              <div className="nav-text">All<span> Rooms</span></div>
            </div>
            <div className="nav-public nav-btn" onClick={e => handleRoomSelection("Public")}>
              <div className="nav-icon"><img src={publicRoom} alt="public room"></img></div>
              <div className="nav-text">Public<span> Rooms</span></div>
            </div>
            <div className="nav-private nav-btn" onClick={e => handleRoomSelection("Private")}>
              <div className="nav-icon"><img src={privateRoom} alt="private room"></img></div>
              <div className="nav-text">Private<span> Rooms</span></div>
            </div>
          </div>
        </div>
        <div className="left-btm glass-blur flex flex-column">
          <div className="room-banner flex">
            <div className="room-type lobby-title text-title">{roomType} Rooms</div>
          </div>
          <CreateRoom socket={socket} handleCreateRoom={handleCreateRoom}></CreateRoom>
          <RoomList rooms={rooms} joinRoom={handleJoinRoom} show={roomType}></RoomList>
        </div>
      </div>
    </div>
  );
}