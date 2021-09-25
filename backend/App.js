const express = require("express");
const path = require('path')
const app = express();
var cors = require("cors");
const port = 3001;
const changepasswordRouter=require('./routes/changepassword')
const deleteStudentRouter = require("./routes/deleteStudent");
const addstudent = require('./services/add-student')
const getstudent = require('./services/get-student')
const editstudent = require('./services/edit-student')
const multer = require('multer');
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,__dirname+"/static/assets/uploads/");
    console.log(path,)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-pic-${file.originalname}`);
  },
});
console.log(storage)
const upload = multer({ storage: storage, fileFilter: imageFilter });

const loginRouter = require('./routes/login')
const studentDetailsRouter = require('./routes/getStudentDetails')
app.use(cors());
var bodyParser = require("body-parser");
const { Api } = require("@mui/icons-material");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use(function(req,res, next){
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000', 'http://localhost');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use('/api/changepassword', changepasswordRouter);
app.use("/api/login", loginRouter);
app.use("/api/studentDetails", studentDetailsRouter);
app.use("/api/deleteStudent", deleteStudentRouter);

app.post('/add-student', upload.any(), function(req, res, next){
  try{
    addstudent.AddStudent(req.body, req.files, __dirname, res)
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

app.get('/get-student', async function(req, res){
  try{
    var response = await getstudent.GetStudent(req.query.id)
    res.send(response)
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/edit-student', upload.any(), async function(req, res){
  try{
    var response = await editstudent.EditStudent(req.body, req.files, __dirname, req.query.id)
    if(response){
      res.sendStatus(201)
    }
    else{
      res.sendStatus(500)
    }
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

