const socket = io('http://localhost:8000');


//Get DCM elemensts in respective Js variables
const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

//Audio will play on recieving messages
var audio = new Audio('ting.mp3');

//Function which will append event info to the container
const append = (message, position) => 
{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left')
    {
        audio.play();
    }
}


//Ask new user for his/her name & let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name);

//If a new user joins, recieve his/her name from server
socket.on('user-joined',name =>
{
    append(`${name} joined the chat`, 'right')
})

//If server sends a mesaage , recieve it
socket.on('receive', data =>
{
    append(`${data.name}: ${data.message}`, 'left')
})


//If a user leaves the chat, append the info to the container
socket.on('left', name =>
{
    append(`${name} left the chat`, 'right')
})

//If the form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})