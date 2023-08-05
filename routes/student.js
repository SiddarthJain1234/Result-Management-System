const express= require('express');
const expressLayouts = require('express-ejs-layouts')
const router=express.Router();
const student=require('../models/student')
router.use(express.static('./public'))
router.use(expressLayouts)


router.get('/findresult', (req,res) => {
    res.render('find_result',{loggedin:'false'});
})


router.post('/find',async (req,res)=>{
    const {rollno, dob}=req.body;
    const st=await student.findOne({rollno:rollno});
    res.render('student_details',{stu:st ,loggedin:'false'});

})

module.exports= router;