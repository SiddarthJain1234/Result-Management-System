const express= require('express');
const expressLayouts = require('express-ejs-layouts')
const router=express.Router();
const student=require('../models/student')
router.use(express.static('./public'))
router.use(expressLayouts)


router.post('/createsession',async (req,res) =>{


    if(req.body.email=="admin@123" && req.body.pwd=="admin"){
       
        res.cookie('admin','true');
        const students=await student.find({});
       
      res.render('student_list',{loggedin:'true',sts:students});
    }
   
    else{

        res.render('loginas',{loggedin:'false'});
    }

})


router.get('/addrecord',(req,res)=>{
  if(req.cookies.admin=='true'){
    let st;
    res.render('add_record',{loggedin:'true',edit:'false',st});
  }
  else{
    res.redirect('back');
  }
})

router.get('/logout',(req,res)=>{
  if(req.cookies.admin=='true'){
    res.clearCookie('admin');
    res.render('loginas',{loggedin:'false'});
  }
  else{
    res.redirect('back');
  }
})


router.post('/createstudent', async (req,res)=>{

  try {
    console.log(req.body.name)
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

    
    if(req.cookies.admin=='true'){
      res.redirect('back');
    }
    else{
      res.render('teacher_login',{loggedin:'false'});;
    }

    
});

module.exports= router;