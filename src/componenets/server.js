const express = require('express');
const path = require('path');
const http = require('http');


const app = express();
const server = http.createServer(app);
const{Server}=require("socket.io");
const cors=require("cors");
app.use(cors());
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});
const PORT = process.env.PORT || 4000;


// Serve the static files from the React app

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("receive_message",data);
        console.log(data);
    })
  });

server.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
