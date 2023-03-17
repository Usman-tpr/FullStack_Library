const express=require('express');
const router=express.Router();
const Auther=require('../models/auther')

//for all authers
router.get('/',async(req,res)=>{
 try {
    const authers=await Auther.find({});
    res.render('auther/index',{authers:authers});
 } catch (error) {
    res.redirect('/auther')
 }
    
});
 
//for new auther

router.get('/new',(req,res)=>{
    res.render('auther/new',{ auther:new Auther()})
})
//for auther post

router.post('/add',async(req,res)=>{
    const auther=new Auther({
      name:req.body.name
    })
    try {
           await auther.save();
           res.redirect('/auther')
    } catch (error) {
        res.render('auther/new',{
            errormessage:"please enter value"
        })
    }
    
})
module.exports=router;