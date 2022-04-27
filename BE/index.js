import  express from 'express'
import cors from 'cors';
import http from 'http'
import  { Server } from 'socket.io';

const app =express();


const server = http.createServer(app)

const io = new Server(server ,{
    cors:{
        origin :"http://localhost:3000",
        method:["GET" , "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("joinroom" , room => socket.join(room) )
    socket.on("newMessage" , ({newMessages, room})=>{
        console.log(room , newMessages)
        io.in(room).emit("getLatestMessage" , newMessages)
    })      
});

app.use(cors());

const port =8000;
app.get("/", (req,res)=>{
    res.send("your chat appliction is started")
})

server.listen(port , ()=>{
    console.log('your server is listening on 8000')
})