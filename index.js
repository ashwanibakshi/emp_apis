const express         = require('express');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const http            = require('http');
const conn            = require('./config/db').con;

const app = express();
mongoose.connect(conn.connection,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('connected to db'))
.catch((err)=>console.log('error in db connection',err));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/emp',require('./routes/employee'));

const port = 3000;

http.createServer(app).listen(port,console.log('server run at port 3000'));