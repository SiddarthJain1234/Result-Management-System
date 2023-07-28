const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const teacherRoutes =require('./routes/teacher')
const studentRoutes=require('./routes/student')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
// const client=require('./config/db')
const student=require('./models/student')
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));



app.use('/teacher',teacherRoutes);

app.use('/student',studentRoutes);







app.use(express.static('./public'))
app.use(expressLayouts)

app.set('view engine', 'ejs');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.get('/', async (req, res) => {

  let flag='false';
  if(req.cookies.admin=='true'){
    flag='true';
    const students=await student.find({});
    res.render('student_list',{loggedin:flag, sts:students});
  }
  else{
    res.render('loginas',{loggedin:flag});
  }
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  mongoose.
connect('mongodb+srv://admin:admin@cluster0.gdtregm.mongodb.net/resultManagement?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')}).catch((error) => {
      console.log(error)
  })

})