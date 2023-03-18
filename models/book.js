const mongoose=require('mongoose');
const imagecoverpath='uploads/bookCovers';
const path=require('path')
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    publishedDate:{
        type: Date,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Auther'
    },
    imageCoverName:{
        type:String,
        required:true
    },
    pageCount:{
        type:Number,
        required:true
    }

});

bookSchema.virtual('coverImagePath').get(function () {
    if(this.imageCoverName!=null)
    {
        return path.join('/',imagecoverpath,this.imageCoverName)
    }
})

module.exports=mongoose.model('Book',bookSchema);
module.exports.imagecoverpath=imagecoverpath;