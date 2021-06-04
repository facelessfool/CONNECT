import React,{ useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { io } from 'socket.io-client'
import WaitingRoom from './WaitingRoom'
import HostRoom from './HostRoom'
import GoogleLogin from 'react-google-login'
import "react-awesome-button/dist/styles.css"
import Background from './Background'


import '../style/style.css'
import { toast } from 'react-toastify'

//globals
//https://connect-quiz-now.herokuapp.com/
//http://localhost:3001

export const socket = io('https://connect-quiz-now.herokuapp.com/', {transports: ['websocket', 'polling', 'flashsocket']});

export default function EnterCodeForm() {

    var [role, setRole] = useState('')

    useEffect(() => {
        

        var joined = false

        var joinbutton = document.getElementById('joinbutton')
        
        socket.on('myroom', (data)=>{
            socket.emit('adduser', {
                name: data.name,
                room: data.room
            })
        })
        
        socket.on('roomcallback', (data)=>{
        
            if(data.joined == true){
                joined = true
            }
        })
        
        socket.on('roomcreated', (data)=>{
            setRole(role = 'host')
            
            ReactDOM.render(
                <div>
                <HostRoom 
                maxPlayers={document.getElementById('max-players').value} 
                podiumPlaces={document.getElementById('podium-places').value} 
                room={data.room} 
                gamecode={data.gamecode}/>
                <Background/>
                </div>,
                document.getElementById('root')
            )
            localStorage.setItem(JSON.parse(localStorage.getItem('user')).profileObj.googleId, true)

        })

        socket.on('changeName', (data)=>{
            //
        })
        socket.on('roomFull', (data)=>{
            toast.warning(data.message)
        })
        
        
        socket.on('addeduser', (data)=>{
            /*var RoomUsers = []
        
            for(var i = 0; i < data.names.length; i++){
                if(data.UserRooms[i] == undefined) return
                if(data.currentRoom == data.UserRooms[i]){
                    RoomUsers.push(data.names[i])
                }
            }*/
            //document.getElementById('userList').innerHTML = RoomUsers
            if(role !== 'host'){
                setRole('player')
                if(sessionStorage.getItem('roomJoined') !== 'true'){

                    ReactDOM.render(
                        <div>
                        <WaitingRoom room={data.currentRoom} usersInRoom={data.UsersInRoom} user={data.name}/>
                        <Background/>
                        </div>,
                        document.getElementById('root')
                    )
                    sessionStorage.setItem('roomJoined', 'true')
                }
                
            }
            
        })
        socket.on('roomAlreadyExists', (data)=>{
            alert('A Room With This Name Already Exists Choose Another Name')
        })

        socket.on('GeneratedCode', (data)=>{
            console.log(data)
            if(document.getElementById('roomName') == undefined) return
            document.getElementById('roomName').value = data
        })

        socket.on('gameAlreadyStarted', (data) => {
            toast.info(`The Game has Already Started in Room ${data.room}`)
        })


    }, [])



    const JoinRoom = ()=>{
        socket.emit('joinroom', {
        code: document.getElementById('code').value, 
        name: document.getElementById('name').value})
    }

    
    function CreateRoom(){
        if(localStorage.getItem(JSON.parse(localStorage.getItem('user')).profileObj.googleId)){
            toast.info('You Can Only Host One Room!')
            return
        }
        socket.emit('createroom', {
            room: document.getElementById('roomName').value,
            gamecode: document.getElementById('gameCode').value,
            host: JSON.parse(localStorage.getItem('user')).profileObj.googleId
        })
    }

    const Generatecode = () => {
        socket.emit('GenerateCode', '')
    }


    return (
        <div>
            <div id='navMargin2'/>
            <div id='mainConatainer'>
                <h1>Join Room</h1>
                <input placeholder={'Enter Your Nickname'} type="text" id="name"/>
                <br></br><input placeholder={'Enter Room Name'} type="text" id="code"/>
                <br></br><button id="joinbutton" onClick={()=>{JoinRoom()}}>Join Room</button>
            </div>
            <div id='subConatainer'>
            <h1>Host Room</h1>
                <input placeholder={'Give Your Room A Name'} type="text" id="roomName"/>
                <br></br><input placeholder={'Enter Game Code'} type="text" id="gameCode"/>
                <div>
                    <h1 style={{fontSize:'25px'}}>Presets</h1><br></br>
                    <label>Max Players</label><input id='max-players' type='number' min='3' max='23'/>
                    <br></br><label>Podium Places</label><input id='podium-places' type='number' min='3' max='10'/>
                </div>
                <br></br><button onClick={()=>{Generatecode()}}>Generate Name</button>
                <br></br><button style={{marginBottom:'1vh'}} onClick={()=>{CreateRoom()}}>Host Room</button>
            </div>
                <textarea hidden cols="40" rows="30" id="userList" placeholder="No users" readOnly></textarea>


        </div>
    )
}
