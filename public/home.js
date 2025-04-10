/*home.html*/
const btn=document.querySelector("#submit");
const homeuser=document.querySelector(".textbox");
let username="";
btn.addEventListener("click",()=>{
    username=homeuser.value;
    sessionStorage.setItem("username",username);
    window.location.href = "index.html";
})
