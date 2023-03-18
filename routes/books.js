const express=require('express');
const router=express.Router();
const Auther=require('../models/auther');
const Book=require('../models/book');
const path=require('path');
const imageMimeTypes=['images/jpg','images/png','images/gif']
const multer=require('multer');
const uploadpath=path.join('public',Book.imagecoverpath)
const upload=multer({
    dest:uploadpath,
    filefilter:(req,file,callback)=>{
       callback(null,imageMimeTypes.includes(file.mimetype))
    }
})

//for all authers
router.get('/',async(req,res)=>{
    let query=Book.find();
    query=query.regex('title', new RegExp(req.query.title,'i'));
try {
    const books= await query.exec();
    res.render('book/index',{
        books,
        searchParam:req.query
    })
} catch (error) {
    console.log(error)
    res.redirect('/auther')
}
    
});
 
//for new auther

router.get('/new',async(req,res)=>{
       try {
        const authers=await Auther.find({});
        const book=new Book();

        res.render('book/new',{
            authers:authers,
            book:book

        })
       } catch (error) {
        res.send('error created')
       }
})
//for auther post

router.post('/', upload.single('cover'), async(req,res)=>{
    const filename=req.file.filename;
   const book=new Book({
    title:req.body.title,
    auther:req.body.auther,
    publishedDate:req.body.publishDate,
    pageCount:req.body.pageCount,
    desc:req.body.desc,
    imageCoverName:filename
   })
    try {
        const newbook=await book.save()
        res.send('saved')
    } catch (error) {
        console.log(error)
    }
})
module.exports=router;