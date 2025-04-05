let username = prompt("Enter your Username"); 
alert("Welcome " + username + "!");

let greet=document.querySelector(".name");
greet.innerText=`Player Name:- ${username}`;

let i=0,j=0;
let oppo="";

let pappu=document.querySelector(".oname");
pappu.innerText=`Pappu:- fetching`;

let myscore=document.querySelector(".score");
myscore.innerText=`My Score:  ${i}`;

let opscore=document.querySelector(".oscore");
opscore.innerText=`Score:  ${j}`;
// Send username to the WebSocket server

const socket=io("http://192.168.1.47:8080");

let room=null;

socket.emit('add',username);
socket.on('welcome',(data)=>{
    console.log("connected 2 server");
})

let box=document.querySelector(".mainbox");
let boxforimage=document.querySelector(".fruit");

socket.on('wait',()=>{
    boxforimage.innerText="Waiting for Opponent";
});

socket.on('match_found',(oname)=>{
    pappu.innerText=`Opponent:- ${oname}`;
    boxforimage.innerText="";
})


socket.on('quiz',(options)=>{
    let l=options.length;
    console.log(l);
    console.log(options[0]);
    console.log(options[1]);
    console.log(options[2]);
    console.log(options[3]);
    console.log(options[l-1]);
    let photo=document.createElement("img");
    photo.src=options[l-1];
    photo.classList.add("image");
    boxforimage.appendChild(photo);
});


