const socket = io();

socket.on("currentColor",(data)=>{
    document.querySelector("body").style.backgroundColor = data.color;
})

const container = document.querySelector(".colors");

container.addEventListener("click",(e)=>{
    if(e.target.classList.contains("color")){
        socket.emit("colorChange",{color:e.target.id})
    }
})
socket.on("returnColor",(data)=>{
    document.querySelector("body").style.backgroundColor = data.color;
})