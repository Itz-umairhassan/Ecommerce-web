const multer=require('multer')

let storage=multer.diskStorage({
   destination:(req,file,cb)=>{
    cb(null,'uploaded')
   },
   filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now()+'.png')
   }
})
module.exports=storage
