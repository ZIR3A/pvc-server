const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;

const app = express();

// app.use(express.static('../client/build'));
// app.get("*", (req, res) => {
//     res.sendFile(require('path')
//         .resolve(__dirname, 'client', 'build', 'index.html'));
// })
app.get('/', (req,res)=>{
    res.send("hello World")
})


const server = http.createServer(app);

// const io = socketIo(server);
var io = socketIo(server,{
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
// let interval;

io.on("connection", (socket) => {
  socket.emit('connection-success', {
    status: 'connection-success',
    socketId: socket.id,
  })

  socket.on('sdp', data => {
    socket.broadcast.emit('sdp', data)
  })

  // get data from fromtend
  socket.on('candidate', data => {
    socket.broadcast.emit('candidate', data)
  })
  // socket.on("disconnect", () => {
  //   socket.disconnect();
  //   // socket.close()
  //   // console.log("Client disconnected");
  // });
});

server.listen(port, () => console.log(`Listening on port ${port}`));