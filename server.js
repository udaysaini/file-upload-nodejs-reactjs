var express = require('express');
var bodyParser = require('body-parser');
var PORT = 4000; //PORT at which BackEnd will run.

var multer = require('multer');
var multerUpload = multer({dest: 'uploadedFiles/'}); //destination for temporary files

var upload = require('./routes/fileroutes');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// const cors=require('cors');
//app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//ROUTER config for Upload
var router = express.Router();

router.get('/', function (req, res) {
  // res.json({message : 'WELCOME TO API'});
    res.send('WELCOME');
});
router.post('/fileUpload', multerUpload.any(), upload._file_upload);

app.use('/api', router);


//EXPRESS SERVER
app.listen(PORT, function () {
    console.log('Server started on Port : ' + PORT);
});
