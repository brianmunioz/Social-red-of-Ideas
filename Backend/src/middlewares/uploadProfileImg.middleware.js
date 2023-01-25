const multer = require('multer');
const path = require('path');

function uploadImage(){
    const storage = multer.diskStorage({ //configuration with multer
        destination: './src/public/img_profile',
        filename: function(req,file,cb){
            cb(null,`${Date.now()}-${file.originalname}`)
        }
     
    })
    const upload =  multer({
        storage,
        fileFilter: (req,file,cb)=>{
            const filetypes = /jpeg|jpg|png/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname));
            console.log(mimetype)
         
            if(mimetype && extname  ) {
                return cb(null,true)
            }
            
            
            cb({message:"You not upload image type required"})
        }
    }).single('myFile');
    console.log('entro al middleware');
    return upload
}

module.exports = uploadImage();

