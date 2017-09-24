var fs = require('fs');
var path = require('path');
var async = require('async');

var cmd = require('node-cmd'); //Used to remove the temporary files

exports._file_upload = function (req, res) {
    console.log('\nREQUEST @Backend\n\n', req.files);

    var filesArray = req.files;

    async.each(filesArray, function (file, eachCallback) {

        async.waterfall([
            function (callback) {
                fs.readFile(file.path, (err, data) => {
                    if(err){
                        console.log('ERROR OCCURRED', err);
                    } else {
                        callback(null, data);
                        console.log(data);
                    }
                });
            },
//2nd
            function (data, callback) {
                var directory_name = 'FINAL_UPLOADS';
                var WritePath = directory_name+'/'; //LOCAL FOLDER WHERE FILES WILL BE UPLOADED

                var dir = './'+directory_name;
                
                if (!fs.existsSync(dir)){
                  console.log('Directory Created.')
                    fs.mkdirSync(dir);
                }

                fs.writeFile(WritePath + file.originalname, data, (err) => {
                    if(err){
                        console.log('Error Occured', err);
                    } else {
                        callback(null, 'done');
                    }
                })
            }
        ], function (err, result) {
            //pass final callback to async each to move on to next file
            eachCallback();
        })

    }, function(err){
        if(err){
            console.log('ERROR occurred in each method', err);
        } else {
            console.log('Finished Processing');
            res.send({
                'code':'200',
                'success': 'Files Uploaded Successfully'
            });
            cmd.run('rm -rf ./uploadedFiles/*')
        }
    })
};
