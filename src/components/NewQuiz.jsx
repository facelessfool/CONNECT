import React,{ useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { socket } from './EnterCodeForm'
import ReactDOM from 'react-dom'

import Button from '@material-ui/core/Button'

import firebase from "firebase"
import "firebase/database";
import { toast } from 'react-toastify'

export default function NewQuiz() {

    const Submit = () => {
        for(var i = 0; i < document.getElementsByClassName('userInput').length; i++){
            console.log('userIn')
            if(document.getElementsByClassName('userInput')[i].value == ""){
                toast.error('A field has been left empty!')
                return
            }
        }
        firebase.database().ref(`quizes/`).push({
            name: document.getElementById('quizName').value,

            q0: {
                question: document.getElementById('question1').value,
                answer: document.getElementById('answer1').value
            },
            q1:{
                question: document.getElementById('question2').value,
                answer: document.getElementById('answer2').value

            },
            q2:{
                question: document.getElementById('question3').value,
                answer: document.getElementById('answer3').value
            },
            q3:{
                question: document.getElementById('question4').value,
                answer: document.getElementById('answer4').value
            },
            q4:{
                question: document.getElementById('question5').value,
                answer: document.getElementById('answer5').value
            },
            q5:{
                question: document.getElementById('question6').value,
                answer: document.getElementById('answer6').value
            }
    
        })
        toast.success('Quiz Created!')
    }


    return (
        <div style={{backgroundColor:'white', borderRadius:'25px', margin:'5%', marginTop:'20vh'}}>
            <div>
                <h1>Quiz Name</h1>
                <input className='userInput' id={'quizName'} type='text' placeholder="Enter Quiz's Name"></input>
            </div>
            <div>
                <h1>Question1</h1>
                <input className='userInput' id='question1' type='text' placeholder={'Question'}/>
                <input className='userInput' id='answer1' type='text' placeholder={'Answer'} />
            </div>
            <div>
                <h1>Question2</h1>
                <input className='userInput' id='question2' type='text' placeholder={'Question'}/>
                <input className='userInput' id='answer2' type='text' placeholder={'Answer'} />
            </div>
            <div>
                <h1>Question3</h1>
                <input className='userInput' id='question3' type='text' placeholder={'Question'}/>
                <input className='userInput' id='answer3' type='text' placeholder={'Answer'} />
            </div>
            <div>
                <h1>Question4</h1>
                <input className='userInput' id='question4' type='text' placeholder={'Question'}/>
                <input className='userInput' id='answer4' type='text' placeholder={'Answer'} />
            </div>
            <div>
                <h1>Question5</h1>
                <input className='userInput' id='question5' type='text' placeholder={'Question'}/>
                <input className='userInput' id='answer5' type='text' placeholder={'Answer'} />
            </div>
            <div>
                <h1>Question6</h1>
                <input className='userInput' id='question6' type='text' placeholder={'Question'}/>
                <input className='userInput' id='answer6' type='text' placeholder={'Answer'} />
            </div>
            <div>
                <Button style={{marginBottom:'1vh'}} variant="contained" color="primary" size='small' onClick={()=>{Submit()}}>Submit</Button>
            </div>
        </div>
    )
}
