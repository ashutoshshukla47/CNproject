let username=sessionStorage.getItem("username");

console.log(username);

let greet=document.querySelector(".name");
greet.innerText=`Player Name:- ${username}`;

let i=0,j=0;
let oppo="";

let pappu=document.querySelector(".oname");
pappu.innerText=`Opponent:- Fetching`;

let myscore=document.querySelector(".score");
myscore.innerText=`My Score:  ${i}`;

let opscore=document.querySelector(".oscore");
opscore.innerText=`Opponent Score:  ${j}`;
// Send username to the WebSocket server

const socket=io("http://localhost:8080");

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
    pappu.innerText=`Opponent Name:- ${oname}`;
    boxforimage.innerText="";
})


socket.on('quiz',(options)=>{
    let l=options.length;
    console.log(l);
    let a1=Math.floor(Math.random()*4);

    let a2=a1;
    while(a2==a1)
    {
        a2=Math.floor(Math.random()*4);
    }
    let a3=a2;
    while(a3==a1||a3==a2)
    {
        a3=Math.floor(Math.random()*4);
    }
    let a4=a3;
    while(a4==a3||a4==a3||a4==a2||a4==a1)
    {
        a4=Math.floor(Math.random()*4);
    }
    let a=options[a1];
    let b=options[a2];
    let c=options[a3];
    let d=options[a4];
    let photo=document.createElement("img");
    photo.src=options[l-1];
    photo.classList.add("image");
    boxforimage.innerHTML="";
    boxforimage.appendChild(photo);
    const o1=document.querySelector("#a");
    o1.innerText=a;
    const o2=document.querySelector("#b");
    o2.innerText=b;
    const o3=document.querySelector("#c");
    o3.innerText=c;
    const o4=document.querySelector("#d");
    o4.innerText=d;
    [o1, o2, o3, o4].forEach(btn => btn.disabled = false);
    [o1, o2, o3, o4].forEach(btn => btn.style.backgroundColor = "white");



    [o1, o2, o3, o4].forEach(button => {
        button.onclick = () => {
            // Disable all buttons
            [o1, o2, o3, o4].forEach(btn => btn.disabled = true);

            if (button.innerText === options[0]) {
                button.style.backgroundColor = "green";
                i=i+4;
                myscore.innerText=`My Score:  ${i}`;
                socket.emit("score",i);
            } else {
                button.style.backgroundColor = "red";

                // Highlight the correct one
                [o1, o2, o3, o4].forEach(btn => {
                    if (btn.innerText === options[0]) {
                        btn.style.backgroundColor = "green";
                    }
                });
            }
        };
    });

    socket.on("oscore", (data) => {
        j=data; // Opponent's score
        console.log("opponents score increased");
        opscore.innerText = `Score: ${j}`;
    });
    
    socket.on("result",()=>{
        if(i>j)
        {
            boxforimage.innerHTML="<h1>WINNER OP BOLTE</h1>";
        }
        else if(i<j)
        {
            boxforimage.innerHTML="<h1>1 hp bacha bhai</h1>";
        }
        else
        {
            boxforimage.innerHTML="<h1> okay tata bye bye gya</h1>";
        }
    });

});




