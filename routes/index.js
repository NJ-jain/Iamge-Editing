var Jimp = require('jimp');
var path = require("path");

var way = path.join(__dirname, '../public/images/uploads/');
// open a file called "lenna.png
console.log( path.join(__dirname, '../public/images/uploads/'));
var deletePath = path.join(__dirname , '../public/images/uploads/')
var express = require('express');
const multer = require('multer')
var router = express.Router(); 
var fs = require('fs');
const e = require('express');

const upload = multer({ dest: 'uploads/' })
// var userModel = require("./users");

var arr = [""];


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
    arr.push(file.originalname);
    console.log(arr);
  },
})

// console.log(arr)
router.get("/", (req, res) => {

      // fs.readdir("./public/images/uploads" , function(err , data){
        // console.log(data);
        // if(data){
        //   data.forEach(function(elem){
        //     console.log(`./public/images/uploads/${elem}`)
        //     fs.unlink(`./public/images/uploads/${elem}` , function(err){
        //       if (err ) throw err;
        //       // res.redirect("index")
        //     })
        //   })
        // }
        res.render("index")
        arr = [""];
      // })

  
})
const uploadStorage = multer({ storage: storage })


// Single file
router.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  // console.log(req.file)
  // var photo = req.file;
  res.render("edit", { arr });
})


// router.get('/greyscale/:image', function (req, res) {
//   Jimp.read(way + req.params.image, (err, lenna) => {
//     if (err) throw err;
//     lenna
//     .greyscale() // set greyscale
//     .write(way + "-greyscaled-" + req.params.image ); // save
//     arr.push( "-greyscaled-" + req.params.image);
//     res.render("edit" , {arr})
//   });
// });

router.get("/greyscale/:image" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {
    if (err) throw err;
    lenna
      .greyscale() // set greyscale
      .write(way + "-greyscaled-" + req.params.image ); // save
      arr.push( "-greyscaled-" + req.params.image);
    res.json( {arr})
  });
  // res.json({realname});
})


router.get("/rotate/:image" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {

    if (err) throw err;
    lenna
      .rotate(90) // set greyscale
      .write(way + "-rotate-" + req.params.image ); // save
      arr.push( "-rotate-" + req.params.image);
    res.json( {arr})
  });
  // res.json({realname});
})

router.get("/invert/:image" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {

    if (err) throw err;
    lenna
      .invert() // set greyscale
      .write(way + "-invert-" + req.params.image ); // save
      arr.push( "-invert-" + req.params.image);
    res.json( {arr})
    console.log(arr);
  });
  // res.json({realname});
})

router.get("/brightness/:image/:val" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {
    val = Number(req.params.val);
    
    if (err) throw err;
    lenna
      .brightness(val) // set greyscale
      .write(way +val + "Brightness" + req.params.image ); // save
      arr.push( val + "Brightness"+ req.params.image);
    res.json( {arr})
  });
  // res.json({realname});
})

router.get("/constrant/:image/:val" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {
    val = Number(req.params.val);
    
    if (err) throw err;
    lenna
      .contrast(val) // set greyscale
      .write(way +val + "constrant"+ req.params.image ); // save
      arr.push( val + "constrant"+ req.params.image);
    res.json( {arr})
  });
  // res.json({realname});
})


router.get("/sepia/:image" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {

    if (err) throw err;
    lenna
      .sepia() // set greyscale
      .write(way + "-sepia-" + req.params.image ); // save
      arr.push( "-sepia-" + req.params.image);
    res.json( {arr})
    console.log(arr)
  });
  // res.json({realname});
})
// image.flip();
// image.mirror();
// image.flip(false, true);


router.get("/mirror/:image" , async function(req , res){
  Jimp.read(way + req.params.image, (err, lenna) => {

    if (err) throw err;
    lenna
      .dither565() // set greyscale
      // .mirror()
      // .dither565(); 
      // .flip(false , true)
      .write(way + "-mirror-" + req.params.image ); // save
      arr.push( "-mirror-" + req.params.image);
    res.json( {arr})
  });
  // res.json({realname});
})


module.exports = router;