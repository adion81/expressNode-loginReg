var path= require('path');
let fs = require('fs');

let mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/loginReg", {useNewUrlParser: true, useUnifiedTopology: true});

let models_path = path.join(__dirname, './../models');

// iterates through the models folder and searches for all model files
fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js')>=0){
        require(models_path + '/'+file);
    }
});