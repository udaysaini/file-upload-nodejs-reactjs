import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

//superagent
var request = require('superagent');
var BASE_API_URL = 'http://localhost:4000/api/';

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            filesPreview: [],
            filesToBeSent : [],
            printCount: 10
        }
    }

    onDrop(acceptedFiles, rejectedFiles) {
        console.log('Accepted files: ', acceptedFiles[0]);

        var filesToBeSent = this.state.filesToBeSent;

        if(filesToBeSent.length < this.state.printCount){
            filesToBeSent.push(acceptedFiles);

            var filesPreview = [];

            for( var i in filesToBeSent){
                filesPreview.push(
                    <div key={i}>
                        {filesToBeSent[i][0].name}
                        <a href="#">
                            <FontIcon style={{top:10}} color={blue500}>
                                clear
                            </FontIcon>
                        </a>
                    </div>
                )
            }
            this.setState({
                filesToBeSent: filesToBeSent,
                filesPreview: filesPreview
            })
        } else {
            alert('You have reached the limit of Uploading files at one time.')
        }
    }

    handleClick(event){
        console.log('handleClick', event);

        if(this.state.filesToBeSent.length > 0) {
            var filesArray = this.state.filesToBeSent;

            var req = request.post(`${BASE_API_URL}fileupload`);

            for(var i in filesArray){
                var currentFile = filesArray[i][0];
                req.attach(currentFile.name, currentFile);

                console.log('CURRENT FILE', currentFile);
            }

            req.end(function (err, res) {
                if (err){
                    console.log('error occured');
                }
                console.log('RESPONSE', res);
                alert('File Upload Complete');
            });
        } else {
            alert('PLEASE UPLOAD SOME FILES FIRST.');
            console.log('STATE', this.state);
        }


    }

    render() {
        return (
            <div className="App">

                <AppBar title='File Upload _UD11' />

                <center>
                    <div style={{margin: '20px'}}>
                        <Dropzone  onDrop={(files) => this.onDrop(files)}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                        <div>
                            Files to be UPLOADED are :
                            {this.state.filesPreview}
                        </div>
                    </div>
                </center>

                <RaisedButton label="Upload Files"
                              primary={true}
                              style={{margin: '15px'}}
                              onClick={(event) => this.handleClick(event)}
                />

            </div>
        )
    }
}