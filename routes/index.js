const { isUtf8 } = require('buffer');
var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require('path');
// 
const gpath = path.join(__dirname, "../", "public", "uploads")



/* GET home page. */
router.get('/', function(req, res, next) {
  const files = fs.readdirSync(gpath)
  res.render('index', { files: files , filedata: "", filename : "" });
});


router.get('/:filename', function(req, res, next) {

  const filedata = fs.readFileSync(path.join(gpath, req.params.filename), "utf-8"
  );

  const files = fs.readdirSync(gpath);
   res.render('index', { files: files, filedata : filedata, filename : req.params.filename });
});


router.get('/delete/:filename', function(req, res){
  fs.unlinkSync(path.join(gpath, req.params.filename));
  res.redirect("/");
})

router.post('/update/:filename', function(req, res){
  fs.writeFileSync(path.join(gpath, req.params.filename), req.body.filedata);
  res.redirect(`/${req.params.filename}`);
})



router.post("/createfile", function(req, res, next) {
  // const filename = req.body.filename;
  const { filename } = req.body;
  fs.writeFileSync(path.join(gpath, filename), "");
  // res.send("file created!") file created shows when we type the file name and press enter
  // now we want to enter the file name and open that particular file
  // res.redirect(`/${filename}`);

});
  

module.exports = router;
