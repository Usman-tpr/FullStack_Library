if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const expresslayouts=require('express-ejs-layouts');
const indexRouter=require('./routes/index');
const autherRouter=require('./routes/auther')
const  bodyparser=require('body-parser')
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.set('layout','layouts/layout');
app.use(expresslayouts);
app.use(express.static('public'))
app.use(bodyparser.urlencoded({limit:'10mb', extended:false}))
app.use('/',indexRouter);
app.use('/auther',autherRouter);
app.listen(process.env.PORT || 3000);

const mongoose=require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db=mongoose.connection;
db.on('error',error => console.log("this is "+error))
db.once('open',()=> console.log('connected'))