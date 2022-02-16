import './App.css';
import Lobby from './components/lobby/lobby';
import Game from './components/game';
import io from 'socket.io-client'
import React from 'react';
import Register from './components/register';
import Login from './components/login';
import { PointSpreadLoading } from 'react-loadingg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const socket = io.connect('wss://drawex-be.wbx.ninja/', { transports: ['websocket', 'polling', 'flashsocket'] })

function App(embeddedAppSDK) {
  console.log("here-------------------")
  console.log(embeddedAppSDK);
  const [userName, setUserName] = React.useState(localStorage.getItem('userName'))
  const [rooms, setRooms] = React.useState([])
  const [isLogin, setLogin] = React.useState(false)

  function handleLogin(username, initData) {
    setUserName(username);
    setRooms(initData.rooms);
    setLogin(true);
  }
  React.useEffect(() => {
    socket.on('updateRoomInfo', (data) => { 
      setRooms(data)
    })
  }, []);

  React.useEffect(() => {
    socket.on('user_on_connection', (data) => {
      setRooms(data.rooms)
    })
  }, []);
  React.useEffect(() => {
    socket.on('updateRoomInfo', (data) => {   
      setRooms(data)
    })
  }, []);


  return (
    <Router>
      <Switch>
        <div>
          <Route exact path='/'>
            {userName === null ? <Redirect to="/login" /> :
              <div className="App">
                <header className="App-header main-background">
                  <Lobby socket={socket} userName={userName} rooms={rooms} isLogin={isLogin} handleLogin={handleLogin} embeddedAppSDK={embeddedAppSDK}></Lobby>
                </header>
              </div>
            }
          </Route>

          <Route exact path='/register'>
            <div className="App">
              <header className="App-header main-background">
                <Register socket={socket}></Register>
              </header>
            </div>
          </Route>

          <Route exact path='/login'>
            <div className="App">
              <header className="App-header main-background">    
                <Login socket={socket} handleLogin={handleLogin}/>
              </header>
            </div>
          </Route>

          <Route path='/room/:id'>
            {(() => {
              if (userName === null) {
                return <Redirect to="/login" />
              } else {
                return (<div className="App main-background">
                  <Game socket={socket} userName={userName}/>
                </div>)
              }
            })()}
          </Route>

          <Route path='/test'>
            <PointSpreadLoading color="#b08cc6"></PointSpreadLoading>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
