const express= require('express');
const expressLayouts = require('express-ejs-layouts')
const router=express.Router();
const passport=require('../config/passport')
const student=require('../models/student')
const initliazepassport=require('../config/passport');
router.use(express.static('./public'))
router.use(expressLayouts)





router.post('/createsession',passport.authenticate('local', { failureRedirect: 'back' }),async (req,res) =>{
      const students=await student.find({});
      res.render('student_list',{loggedin:'true',sts:students});    
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // If the user is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not authenticated, redirect them to the login page (or return an error)
    res.redirect('back'); 
  }
}

router.get('/addrecord',ensureAuthenticated,(req,res)=>{   
    let st;
    res.render('add_record',{loggedin:'true',edit:'false',st});
})

router.get('/logout',ensureAuthenticated,(req,res)=>{
    res.clearCookie(Object.keys(req.cookies)[0]);
    res.render('loginas',{loggedin:'false'});
})


router.post('/createstudent', async (req,res)=>{
  try {
    const stud =await student.create(req.body);
    const students=await student.find({});
    res.render('student_list',{loggedin:'true',sts:students});
                  
  } catch (error) {
    console.log(error)
    res.redirect('back');
  }  
})

router.get('/edit/:id',async (req,res)=>{
  try {
    const {id} = req.params;  
    const st=await student.findById(id);
    res.render('add_record',{loggedin:'true' ,edit:'true', st});
  } 
  catch (error) {
    console.log(error);
    res.send(error);
  }    
})


router.get('/delete/:id', async(req,res)=>{
 try {
  const {id} = req.params;
  const st = await student.findByIdAndDelete(id);
  if(!st){
    res.send('object not found with this id')
    return;
  }
  const students=await student.find({});
       
      res.render('student_list',{loggedin:'true',sts:students});

 } catch (error) {
  console.log(error);
  
  }
})





router.post('/editstudent', async(req,res)=>{
  try {
    const id=req.body.Id;
    delete (req.body.Id);
    const st = await student.findByIdAndUpdate(id,req.body);  
    if(!st){
      res.send('object not found with this id')
      return;
    }
    const students=await student.find({});
      res.render('student_list',{loggedin:'true',sts:students});
  } catch (error) {
    console.log(error);    
  }

});




router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('login router called')
    res.send('you are already loggedin,logout first <a href="/teacher/logout">logout</a>');
  }
  else{
    res.render('teacher_login',{loggedin:'false'});  
  } 
});


module.exports= router;