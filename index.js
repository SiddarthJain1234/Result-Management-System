const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts')
const studentRoutes=require('./routes/student')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const student=require('./models/student')
const passport=require('./config/passport')
const  teacherRoutes=require('./routes/teacher')



app.use(session({
  secret: 'false',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.session());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use('/teacher',teacherRoutes);
app.use('/student',studentRoutes);


app.use(express.static('./public'))
app.use(expressLayouts)

app.set('view engine', 'ejs');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.get('/',async (req, res) => {
  if (req.isAuthenticated()) {
    res.send('you are already loggedin,logout first <a href="/teacher/logout">logout</a>');
  }
  else{
  let flag='false';
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