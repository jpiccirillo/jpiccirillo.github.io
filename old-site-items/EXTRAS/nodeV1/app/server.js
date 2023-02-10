const express = require('express'),
      server = express();

server.set('port', process.env.PORT || 3000);

//Basic routes
server.get('/', (request,response)=>{
   response.sendFile(__dirname + '/index.html');
});

server.get('/about',(request,response)=>{
   response.sendFile(__dirname + '/about.html');
});

//Express error handling middleware
server.use((request,response)=>{
   response.status(505);
   response.sendFile(__dirname + '/404.html');
});

//Binding to a port
server.listen(3000, ()=>{
  console.log('Express server started at port 3000');
});
